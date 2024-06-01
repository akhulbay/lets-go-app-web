import './side-bar.css';
<<<<<<< HEAD
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { MdEvent } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import {NavLink, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth-service.js";


=======
import {NavLink, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth-service.js";

>>>>>>> f2f43bcfb6e22ccbfd20c6c1c43b994aa06646e9
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
<<<<<<< HEAD
                <div className="sidebar-item">Users <FaUsers /></div>
            </NavLink>
            <NavLink to="/create-user">
                <div className="sidebar-item">Create User <FaUserPlus /></div>
            </NavLink>
            <NavLink to="/events">
                <div className="sidebar-item">Events <MdEvent /></div>
            </NavLink>
            <NavLink to="/create-event">
                <div className="sidebar-item">Create Event <VscGitPullRequestCreate /></div>
            </NavLink>
            <div className="sidebar-item" onClick={() => handleNavigate()}>Sign out <PiSignOutBold /></div>
=======
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
>>>>>>> f2f43bcfb6e22ccbfd20c6c1c43b994aa06646e9
        </div>
    );
}

export default Sidebar;