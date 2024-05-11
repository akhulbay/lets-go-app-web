import axios from "axios";
import {serverUrl} from "./server-url.js";
import authHeader from "./auth-header.js";

const API_USERS_URL = `${serverUrl}/users`;

class UserService {

    async load() {
        let config = {
            headers: {
                "Authorization": authHeader()
            }
        }

        return axios.get(API_USERS_URL, config).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    async loadWithPagination(page, size) {
        let config = {
            headers: {
                "Authorization": authHeader()
            }
        }

        let urlWithParams = `${API_USERS_URL}?page=${page}&size=${size}`;

        return axios.get(urlWithParams, config).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    async loadRoles() {
        let config = {
            headers: {
                "Authorization": authHeader()
            }
        };

        let url = API_USERS_URL + "/roles"

        return axios.get(url, config).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    async create(user) {
        axios.post(API_USERS_URL, user)
    }

    async update(user, userId) {
        let url = `${API_USERS_URL}/${userId}`;

        let config = {
            headers: {
                "Authorization": authHeader()
            }
        }

        axios.put(url, user, config).then(r => r.data);
    }

}

export default new UserService();