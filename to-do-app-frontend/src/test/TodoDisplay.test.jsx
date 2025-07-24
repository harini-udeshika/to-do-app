import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoDisplay from '../components/TodoDisplay/TodoDisplay'
import { deleteTodo, completeTodo, fetchTodos } from '../apis/api'
import { toast } from 'react-toastify'

// Mock the API module
vi.mock('../apis/api', () => ({
    deleteTodo: vi.fn(),
    completeTodo: vi.fn(),
    fetchTodos: vi.fn(),
}))

// Mock react-toastify
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
    ToastContainer: vi.fn(() => null),
}))

describe('TodoDisplay Component', () => {
    const mockSetTodos = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the header correctly', () => {
        render(<TodoDisplay todos={[]} setTodos={mockSetTodos} />)

        expect(screen.getByText('Recent Todos')).toBeInTheDocument()
    })

    it('displays empty state when no todos are provided', () => {
        render(<TodoDisplay todos={[]} setTodos={mockSetTodos} />)

        expect(screen.getByText('No tasks yet!')).toBeInTheDocument()
        expect(screen.getByText('Start by adding your first todo to get organized.')).toBeInTheDocument()
    })

    it('displays todos when they are provided', () => {
        const mockTodos = [
            {
                id: 1,
                title: 'Test Todo 1',
                description: 'Test Description 1',
                completed: false,
                createdAt: '2024-01-01T00:00:00.000Z'
            },
            {
                id: 2,
                title: 'Test Todo 2',
                description: 'Test Description 2',
                completed: true,
                createdAt: '2024-01-02T00:00:00.000Z'
            }
        ]

        render(<TodoDisplay todos={mockTodos} setTodos={mockSetTodos} />)

        expect(screen.getByText('Test Todo 1')).toBeInTheDocument()
        expect(screen.getByText('Test Description 1')).toBeInTheDocument()
        expect(screen.getByText('Test Todo 2')).toBeInTheDocument()
        expect(screen.getByText('Test Description 2')).toBeInTheDocument()
    })

    it('successfully deletes a todo when delete button is clicked', async () => {
        const user = userEvent.setup()
        const mockTodos = [
            {
                id: 1,
                title: 'Test Todo',
                description: 'Test Description',
                completed: false,
                createdAt: '2024-01-01T00:00:00.000Z'
            }
        ]
        const updatedTodos = []

        deleteTodo.mockResolvedValue()
        fetchTodos.mockResolvedValue(updatedTodos)

        render(<TodoDisplay todos={mockTodos} setTodos={mockSetTodos} />)

        const deleteButton = screen.getByRole('button', { name: /FaTrash/i })
        await user.click(deleteButton)

        expect(deleteTodo).toHaveBeenCalledWith(1)
        expect(fetchTodos).toHaveBeenCalled()
        expect(mockSetTodos).toHaveBeenCalledWith(updatedTodos)
        expect(toast.success).toHaveBeenCalledWith('Todo Deleted Successfully!', { autoClose: 2000 })
    })

    it('successfully completes a todo when complete button is clicked', async () => {
        const user = userEvent.setup()
        const mockTodos = [
            {
                id: 1,
                title: 'Test Todo',
                description: 'Test Description',
                completed: false,
                createdAt: '2024-01-01T00:00:00.000Z'
            }
        ]
        const updatedTodos = [
            {
                id: 1,
                title: 'Test Todo',
                description: 'Test Description',
                completed: true,
                createdAt: '2024-01-01T00:00:00.000Z'
            }
        ]

        completeTodo.mockResolvedValue()
        fetchTodos.mockResolvedValue(updatedTodos)

        render(<TodoDisplay todos={mockTodos} setTodos={mockSetTodos} />)

        const completeButton = screen.getByRole('button', { name: /FaCheckCircle/i })
        await user.click(completeButton)

        expect(completeTodo).toHaveBeenCalledWith(1)
        expect(fetchTodos).toHaveBeenCalled()
        expect(mockSetTodos).toHaveBeenCalledWith(updatedTodos)
        expect(toast.success).toHaveBeenCalledWith('Todo marked as completed')
    })

    it('renders multiple todos with correct buttons for each', () => {
        const mockTodos = [
            {
                id: 1,
                title: 'Todo 1',
                description: 'Description 1',
                completed: false,
                createdAt: '2024-01-01T00:00:00.000Z'
            },
            {
                id: 2,
                title: 'Todo 2',
                description: 'Description 2',
                completed: false,
                createdAt: '2024-01-02T00:00:00.000Z'
            }
        ]

        render(<TodoDisplay todos={mockTodos} setTodos={mockSetTodos} />)

        const completeButtons = screen.getAllByRole('button', { name: /FaCheckCircle/i })
        const deleteButtons = screen.getAllByRole('button', { name: /FaTrash/i })

        expect(completeButtons).toHaveLength(2)
        expect(deleteButtons).toHaveLength(2)
    })
}) 