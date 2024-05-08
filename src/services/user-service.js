import axios from "axios";
import {serverUrl} from "./server-url.js";
import authHeader from "./auth-header.js";

const API_USERS_URL = `${serverUrl}/users`;

class UserService {

    load() {
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

    loadWithPagination(page, count) {
        let config = {
            headers: {
                "Authorization": authHeader()
            }
        }

        let urlWithParams = `${API_USERS_URL}?page=${page}&count=${count}`;

        return axios.get(urlWithParams, config).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    create(user) {
        axios.post(API_USERS_URL, user)
    }

    update(user) {
        axios.put(API_USERS_URL, user)
    }

}

export default new UserService();