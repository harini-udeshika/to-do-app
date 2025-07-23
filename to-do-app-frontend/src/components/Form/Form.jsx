import { addTodo, fetchTodos } from '../../apis/api';
import './Form.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ToDoForm = ({ todos, setTodos }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '' || description.trim() === '') {
            toast.error("Title and Description cannot be empty!");
            return;
        }

        try {

            await addTodo(title, description);
            const data = await fetchTodos();
            setTodos(data);
            console.log('Fetched Todos after add:', data);

            toast.success("Todo Added Successfully!");
            setTitle('');
            setDescription('');
        } catch (error) {
            toast.error("Failed to add todo or fetch updated todos!");
            console.error('Error adding todo or fetching todos:', error);
        }
    };



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                closeOnClick={true}
            />

            <div className="form-container">
                <div className="title">Add New Todo</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add some details..."
                        rows="4"
                    />
                    <button type="submit">Add Todo</button>
                </form>
            </div>
        </>

    );
};
export default ToDoForm;