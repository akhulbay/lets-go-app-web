import {useState} from 'react';
import './login.css';
import {useNavigate} from "react-router-dom";

import AuthService from "../../services/auth-service.js";

function LoginPage({setIsAuth}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigation = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        AuthService.login(username, password).then(
            () => {
                navigation("/users");
                setIsAuth(true);
            },
            error => {
                alert(error)
            }
        );

    };

    return (
        <div className="login-container">
            <div className="login-header">
                <img src="path_to_logo" alt="Logo" className="login-logo"/>
                <h2>LOG IN</h2>
            </div>
            <form onSubmit={handleLogin} className="login-form">
                <label htmlFor="username">
                    Username
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div className="login-button">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
