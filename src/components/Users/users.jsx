import {useEffect, useState} from "react";
import UserService from "../../services/user-service.js";
import "./users.scss"
import AuthService from "../../services/auth-service.js";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

function Users() {

    let navigate = useNavigate();

    if (!AuthService.isAuthenticated()) {
        navigate("/login");
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let data = await UserService.loadWithPagination(0, 20);
            if (data && data.length > 0) {
                setUsers(data);
            }
        }

        fetchData();
    }, []);

    let userTableData = users.map((user) => {
        return (
            <div className="table-row" id={user.id}>
                <div className="table-data">{user.id}</div>
                <div className="table-data">{user.name}</div>
                <div className="table-data">{user.email}</div>
                <div className="table-data">{user.role}</div>
                <div className="table-data">
                    <Button variant="contained">Block</Button>
                </div>
            </div>
        )
    })

    return (
        <div className="events-component">
            <div className="container">

                <div className="table">
                    <div className="table-header">
                        <div className="header__item"><a id="name" className="filter__link" href="#">ID</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number"
                                                         href="#">Name</a></div>
                        <div className="header__item"><a id="draws" className="filter__link filter__link--number"
                                                         href="#">Email</a></div>
                        <div className="header__item"><a id="losses" className="filter__link filter__link--number"
                                                         href="#">Role</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number"
                                                         href="#"> </a></div>
                    </div>
                    <div className="table-content">
                        {userTableData}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;