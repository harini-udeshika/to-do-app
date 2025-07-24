import './App.css'
import Navbar from './components/Navbar/Navbar'
import ToDoForm from './components/Form/Form'
import TodoDisplay from './components/TodoDisplay/TodoDisplay'
import { useEffect, useState } from 'react'
import { fetchTodos } from './apis/api'
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
        console.log('Fetched Todos:', data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getTodos();
  }, []);

  return (
    <>

      <div className="app-container">
        <Navbar />
        <header className="app-header">
          <h1 className="title">Todo App</h1>
          <p className="subtitle">Organize your tasks · Stay productive!</p>
        </header>

        <div className="app-body">
          <ToDoForm todos={todos} setTodos={setTodos} />
          <TodoDisplay todos={todos} setTodos={setTodos} />
        </div>

      </div>
    </>
  )
}

export default App
