import { addTodo, fetchTodos } from '../../apis/api';
import './Form.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ToDoForm = ({ setTodos }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '' || description.trim() === '') {
            toast.error("Title and Description cannot be empty!", { autoClose: 2000 });
            return;
        }

        try {

            await addTodo(title, description);
            const data = await fetchTodos();
            setTodos(data);
            console.log('Fetched Todos after add:', data);

            toast.success("Todo Added Successfully!", { autoClose: 2000 });
            setTitle('');
            setDescription('');
        } catch (error) {
            toast.error("Failed to add todo or fetch updated todos!", { autoClose: 2000 });
            console.error('Error adding todo or fetching todos:', error);
        }
    };



    return (
        <>
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