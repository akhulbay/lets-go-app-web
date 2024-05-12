import './side-bar.css';
import {NavLink, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth-service.js";

function Sidebar() {
    let navigate = useNavigate();

    function handleNavigate() {
        AuthService.logout();
        navigate("/login")
    }

    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <h2>
                    Admin Panel
                </h2>
            </div>
            <NavLink to="/users">
                <div className="sidebar-item">Users</div>
            </NavLink>
            <NavLink to="/create-user">
                <div className="sidebar-item">Create User</div>
            </NavLink>
            <NavLink to="/events">
                <div className="sidebar-item">Events</div>
            </NavLink>
            <NavLink to="/create-event">
                <div className="sidebar-item">Create Event</div>
            </NavLink>
            <div className="sidebar-item" onClick={() => handleNavigate()}>Sign out</div>
        </div>
    );
}

export default Sidebar;