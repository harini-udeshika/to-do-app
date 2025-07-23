import './App.css'
import Navbar from './components/Navbar/Navbar'
import ToDoForm from './components/Form/Form'
import TodoDisplay from './components/TodoDisplay/TodoDisplay'

function App() {

  return (
    <>
      <Navbar />
      <div className="app-container">
        <header class="app-header">
          <h1 class="title">Todo App</h1>
          <p class="subtitle">Organize your tasks · Stay productive!</p>
        </header>

        <div className="app-body">
          <ToDoForm />
          <TodoDisplay />
        </div>

      </div>
    </>
  )
}

export default App
