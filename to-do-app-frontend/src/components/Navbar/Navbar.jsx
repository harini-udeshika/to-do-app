import './Navbar.css';
import { FaHome, FaTasks } from "react-icons/fa";
const Navbar=()=>{
    return (
        <nav className="navbar">
            <h1>To-Do App</h1>
            <div className="links">
                <a href="/"><FaHome/>Home</a>
            </div>
        </nav>
    );
}

export default Navbar;