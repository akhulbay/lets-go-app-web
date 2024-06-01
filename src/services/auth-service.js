import axios from "axios";
import {serverUrl} from "./server-url.js";

const API_AUTH_URL = `${serverUrl}/auth/`;

class AuthService {

    login(email, password) {
        return axios
            .post(API_AUTH_URL + "login", {
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_AUTH_URL + "register", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isAuthenticated() {
        let currentUser = this.getCurrentUser();

        return currentUser && currentUser.token;
    }
}

export default new AuthService();