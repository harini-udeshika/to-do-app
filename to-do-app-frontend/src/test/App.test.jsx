import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { fetchTodos } from '../apis/api'

// Mock the API module
vi.mock('../apis/api', () => ({
    fetchTodos: vi.fn(),
}))

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the app title and subtitle', () => {
        fetchTodos.mockResolvedValue([])

        render(<App />)

        expect(screen.getByText('To-Do App')).toBeInTheDocument()
        expect(screen.getByText('Organize your tasks')).toBeInTheDocument()
    })

    it('renders the navbar', () => {
        fetchTodos.mockResolvedValue([])

        render(<App />)

        expect(screen.getByText('To-Do App')).toBeInTheDocument()
        expect(screen.getByText(/FaHome.*Dashboard/)).toBeInTheDocument()
    })

    it('renders the form component', () => {
        fetchTodos.mockResolvedValue([])

        render(<App />)

        expect(screen.getByText('Add New Todo')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Add some details...')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument()
    })

    it('renders the todo display component', () => {
        fetchTodos.mockResolvedValue([])

        render(<App />)

        expect(screen.getByText('Recent Todos')).toBeInTheDocument()
    })

    it('displays empty state when no todos are available', async () => {
        fetchTodos.mockResolvedValue([])

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('No tasks yet!')).toBeInTheDocument()
        })
    })

    it('displays todos when they are available', async () => {
        const mockTodos = [
            { id: 1, title: 'Test Todo 1', description: 'Test Description 1', completed: false, createdAt: '2024-01-01' },
            { id: 2, title: 'Test Todo 2', description: 'Test Description 2', completed: true, createdAt: '2024-01-02' }
        ]
        fetchTodos.mockResolvedValue(mockTodos)

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('Test Todo 1')).toBeInTheDocument()
            expect(screen.getByText('Test Todo 2')).toBeInTheDocument()
        })
    })
}) 