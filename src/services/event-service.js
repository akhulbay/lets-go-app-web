import axios from "axios";
import {serverUrl} from "./server-url.js";
import authHeader from "./auth-header.js";

const API_EVENTS_URL = `${serverUrl}/events`;

class EventService {

    load() {
        let config = {
            headers: {
                "Authorization": authHeader()
            }
        }

        return axios.get(API_EVENTS_URL, config).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    loadWithPagination(page, size) {
        let config = {
            headers: {
                "Authorization": authHeader()
            }
        }

        let urlWithParams = `${API_EVENTS_URL}?page=${page}&size=${size}`;

        return axios.get(urlWithParams, config).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    create(user) {
        axios.post(API_EVENTS_URL, user)
    }

    update(user) {
        axios.put(API_EVENTS_URL, user)
    }

}

export default new EventService();