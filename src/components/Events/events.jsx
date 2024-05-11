import {useEffect, useState} from "react";
import "./events.scss"
import AuthService from "../../services/auth-service.js";
import {useNavigate} from "react-router-dom";
import EventService from "../../services/event-service.js";

function Events() {

    let navigate = useNavigate();

    if (!AuthService.isAuthenticated()) {
        navigate("/login");
    }

    const [events, setEvents] = useState([]);

    function parseDateFromArray(dateArray) {
        return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5], dateArray[6] / 1000).toDateString();
    }


    useEffect(() => {
        async function fetchData() {
            let response = await EventService.loadWithPagination(0, 20);
            if (response && response.data.length > 0) {
                setEvents(response.data);
            }
        }

        fetchData();
    }, []);

    let userTableData = events.map((event) => {
        return (
            <div className="table-row" id={event.id}>
                <div className="table-data">{event.id}</div>
                <div className="table-data">{event.city}</div>
                <div className="table-data">{event.address}</div>
                <div className="table-data">{event.description}</div>
                <div className="table-data">{parseDateFromArray(event.dateTime)}</div>
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
                                                         href="#">City</a></div>
                        <div className="header__item"><a id="draws" className="filter__link filter__link--number"
                                                         href="#">Address</a></div>
                        <div className="header__item"><a id="losses" className="filter__link filter__link--number"
                                                         href="#">Description</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number"
                                                         href="#">Date Time</a></div>
                    </div>
                    <div className="table-content">
                        {userTableData}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Events;