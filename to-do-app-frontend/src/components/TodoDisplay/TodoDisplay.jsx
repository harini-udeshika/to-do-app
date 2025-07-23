import './TodoDisplay.css'
import { FaArrowRight, FaCheckCircle, FaCircle, FaDotCircle, FaTrash } from "react-icons/fa"

const TodoDisplay = () => {
    return (
        <div className="to-do-list-container">
            <div className="header">
                <p>Recent Todos</p>
                <button>View All <FaArrowRight /></button>
            </div>
            <div className="to-do-card">
                <div className="card-left">
                    <div className="title">Title</div>
                    <div className="desc">Description</div>
                    <div className="created">7/23/2025</div>
                </div>
                <div className="card-right">
                    <button><FaCheckCircle /></button>
                    <button><FaTrash size={18} color="#889e97" /></button>
                </div>
            </div>
        </div>
    )
}

export default TodoDisplay;