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

    async loadWithPagination(page, size) {
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

    async create(event, banner) {
        let formData = new FormData();

        formData.append("eventToCreate", new Blob([JSON.stringify(event)], { type: "application/json" }));
        formData.append("banner", banner);

        let config = {
            headers: {
                "Authorization": authHeader(),
                "Content-Type": "multipart/form-data"
            }
        }

        axios.post(API_EVENTS_URL, formData, config)
    }

    async delete(eventId) {
        let config = {
            headers: {
                "Authorization": authHeader()
            }
        }

        let url = `${API_EVENTS_URL}/${eventId}`;

        axios.delete(url, config);
    }

    async update(eventToUpdate, eventId) {
        let formData = new FormData();

        // Оборачиваем объект eventToUpdate в Blob для отправки, так как сервер ожидает получить его в виде отдельной части
        formData.append("eventToUpdate", new Blob([JSON.stringify(eventToUpdate)], { type: "application/json" }));

        let config = {
            headers: {
                "Authorization": authHeader(),
                "Content-Type": "multipart/form-data"  // Указываем тип содержимого
            }
        }

        let url = `${API_EVENTS_URL}/${eventId}`;

        axios.put(url, formData, config);
    }

}

export default new EventService();