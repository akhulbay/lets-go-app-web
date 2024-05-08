import axios from "axios";
import {serverUrl} from "./server-url.js";

const API_AUTH_URL = `${serverUrl}/api/auth/`;

class AuthService {

    login(username, password) {
        return axios
            .post(API_AUTH_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_AUTH_URL + "signup", {
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