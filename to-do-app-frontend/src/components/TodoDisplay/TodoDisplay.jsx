import { completeTodo, deleteTodo, fetchTodos } from '../../apis/api';
import './TodoDisplay.css'
import { FaArrowRight, FaCheckCircle, FaCircle, FaDotCircle, FaGgCircle, FaInfoCircle, FaRegDotCircle, FaTrash, FaClipboardList } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper function to format date properly
const formatDate = (dateString) => {
    try {
        // Parse the date string and create a proper Date object
        const date = new Date(dateString);
        return date.toLocaleDateString();
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};

const TodoDisplay = ({ todos, setTodos }) => {
    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            toast.success("Todo Deleted Successfully!", { autoClose: 2000 });

            const data = await fetchTodos();
            setTodos(data);
            console.log('Fetched Todos after delete:', data);
            console.log(`Deleted todo with id: ${id}`);
        } catch (error) {
            toast.error("Failed to delete todo or fetch updated todos!");
            console.error('Error during delete or fetching todos:', error);
        }
    };

    const completeTask = async (id) => {
        try {
            await completeTodo(id);
            toast.success("Todo marked as completed");

            const data = await fetchTodos();
            setTodos(data);
            console.log('Fetched Todos after complete:', data);
            console.log(`Completed todo with id: ${id}`);
        } catch (error) {
            toast.error("Failed to mark todo as completed or fetch updated todos!");
            console.error('Error during complete or fetching todos:', error);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                rtl={false}
                draggable
                theme="light"
                toastClassName="custom-toast"
                closeOnClick={true}
            />
            <div className="to-do-list-container">
                <div className="header">
                    <p>Recent Todos</p>
                </div>

                {todos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <FaClipboardList />
                        </div>
                        <h3>No tasks yet!</h3>
                        <p>Start by adding your first todo to get organized.</p>
                        <div className="empty-illustration">
                            <div className="floating-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                ) : (
                    todos.map((todo, index) => (
                        <div className="to-do-card" key={index}>
                            <div className="card-left">
                                <div className='title-container'>
                                    <div className="title">{todo.title}</div>
                                    <small> {formatDate(todo.createdAt)}</small>
                                </div>

                                <div className="desc">{todo.description}</div>

                            </div>
                            <div className="card-right">
                                <button onClick={() => completeTask(todo.id)}><FaCheckCircle /></button>
                                <button onClick={() => handleDelete(todo.id)}><FaTrash size={18} color="#889e97" /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default TodoDisplay;