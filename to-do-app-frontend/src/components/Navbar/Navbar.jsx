import './Navbar.css';
import { FaHome, FaTasks, FaUser } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>To-Do App</h1>
                <p className="tagline">Organize your tasks</p>
            </div>
            <div className="links">
                <a href="/"><FaHome />Dashboard</a>
            </div>
        </nav>
    );
}

export default Navbar;