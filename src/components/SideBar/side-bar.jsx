import './side-bar.css';
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { MdEvent } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
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
        </div>
    );
}

export default Sidebar;