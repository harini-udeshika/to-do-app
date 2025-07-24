import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock react-toastify
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
    ToastContainer: vi.fn(() => null),
}))

// Mock react-icons
vi.mock('react-icons/fa', () => ({
    FaHome: vi.fn(() => 'FaHome'),
    FaTasks: vi.fn(() => 'FaTasks'),
    FaArrowRight: vi.fn(() => 'FaArrowRight'),
    FaCheckCircle: vi.fn(() => 'FaCheckCircle'),
    FaCircle: vi.fn(() => 'FaCircle'),
    FaDotCircle: vi.fn(() => 'FaDotCircle'),
    FaGgCircle: vi.fn(() => 'FaGgCircle'),
    FaInfoCircle: vi.fn(() => 'FaInfoCircle'),
    FaRegDotCircle: vi.fn(() => 'FaRegDotCircle'),
    FaTrash: vi.fn(() => 'FaTrash'),
    FaClipboardList: vi.fn(() => 'FaClipboardList'),
}))

// Mock the API module
vi.mock('../apis/api', () => ({
    fetchTodos: vi.fn(),
    addTodo: vi.fn(),
    deleteTodo: vi.fn(),
    completeTodo: vi.fn(),
}))