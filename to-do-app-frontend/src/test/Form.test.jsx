import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToDoForm from '../components/Form/Form'
import { addTodo, fetchTodos } from '../apis/api'
import { toast } from 'react-toastify'

// Mock the API module
vi.mock('../apis/api', () => ({
    addTodo: vi.fn(),
    fetchTodos: vi.fn(),
}))

// Mock react-toastify
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

describe('ToDoForm Component', () => {
    const mockSetTodos = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders form elements correctly', () => {
        render(<ToDoForm setTodos={mockSetTodos} />)

        expect(screen.getByText('Add New Todo')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Add some details...')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument()
    })

    it('updates input values when user types', async () => {
        const user = userEvent.setup()
        render(<ToDoForm setTodos={mockSetTodos} />)

        const titleInput = screen.getByPlaceholderText('What needs to be done?')
        const descriptionInput = screen.getByPlaceholderText('Add some details...')

        await user.type(titleInput, 'Test Todo')
        await user.type(descriptionInput, 'Test Description')

        expect(titleInput).toHaveValue('Test Todo')
        expect(descriptionInput).toHaveValue('Test Description')
    })

    it('shows error toast when submitting empty form', async () => {
        const user = userEvent.setup()
        render(<ToDoForm setTodos={mockSetTodos} />)

        const submitButton = screen.getByRole('button', { name: 'Add Todo' })
        await user.click(submitButton)

        expect(toast.error).toHaveBeenCalledWith('Title and Description cannot be empty!', { autoClose: 2000 })
        expect(addTodo).not.toHaveBeenCalled()
    })

    it('successfully submits form with valid data', async () => {
        const user = userEvent.setup()
        const mockTodos = [
            { id: 1, title: 'Test Todo', description: 'Test Description', completed: false, createdAt: '2024-01-01' }
        ]

        addTodo.mockResolvedValue()
        fetchTodos.mockResolvedValue(mockTodos)

        render(<ToDoForm setTodos={mockSetTodos} />)

        const titleInput = screen.getByPlaceholderText('What needs to be done?')
        const descriptionInput = screen.getByPlaceholderText('Add some details...')
        const submitButton = screen.getByRole('button', { name: 'Add Todo' })

        await user.type(titleInput, 'Test Todo')
        await user.type(descriptionInput, 'Test Description')
        await user.click(submitButton)

        expect(addTodo).toHaveBeenCalledWith('Test Todo', 'Test Description')
        expect(fetchTodos).toHaveBeenCalled()
        expect(mockSetTodos).toHaveBeenCalledWith(mockTodos)
        expect(toast.success).toHaveBeenCalledWith('Todo Added Successfully!', { autoClose: 2000 })
    })

    it('clears form inputs after successful submission', async () => {
        const user = userEvent.setup()
        addTodo.mockResolvedValue()
        fetchTodos.mockResolvedValue([])

        render(<ToDoForm setTodos={mockSetTodos} />)

        const titleInput = screen.getByPlaceholderText('What needs to be done?')
        const descriptionInput = screen.getByPlaceholderText('Add some details...')
        const submitButton = screen.getByRole('button', { name: 'Add Todo' })

        await user.type(titleInput, 'Test Todo')
        await user.type(descriptionInput, 'Test Description')
        await user.click(submitButton)

        expect(titleInput).toHaveValue('')
        expect(descriptionInput).toHaveValue('')
    })
}) 