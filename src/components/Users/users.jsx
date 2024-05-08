import {useEffect, useState} from "react";
import UserService from "../../services/user-service.js";
import "./users.scss"
import AuthService from "../../services/auth-service.js";
import {useNavigate} from "react-router-dom";

function Users() {

    let navigate = useNavigate();

    if (!AuthService.isAuthenticated()) {
        navigate("/login");
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        let data = UserService.load();
        if (data && data.length > 0) {
            setUsers(data);
        }
    }, []);

    const userTableData = users.map((user) => {
        <div className="table-row" id={user.id}>
            <div className="table-data">Tom</div>
            <div className="table-data">2</div>
            <div className="table-data">0</div>
            <div className="table-data">1</div>
            <div className="table-data">5</div>
        </div>
    })

    return (
        <div className="users-component">
            <div className="container">

                <div className="table">
                    <div className="table-header">
                        <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number"
                                                         href="#">Wins</a></div>
                        <div className="header__item"><a id="draws" className="filter__link filter__link--number"
                                                         href="#">Draws</a></div>
                        <div className="header__item"><a id="losses" className="filter__link filter__link--number"
                                                         href="#">Losses</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number"
                                                         href="#">Total</a></div>
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