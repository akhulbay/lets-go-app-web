import {useEffect, useState} from "react";
import "./events.scss"
import AuthService from "../../services/auth-service.js";
import {useNavigate} from "react-router-dom";
import EventService from "../../services/event-service.js";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";

function Events() {

    let navigate = useNavigate();

    if (!AuthService.isAuthenticated()) {
        navigate("/login");
    }

    const [events, setEvents] = useState([]);
    const [eventToUpdate, setEventToUpdate] = useState();
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [artistName, setArtistName] = useState('');
    const [title, setTitle] = useState('');
    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);

    function handleDeleteButton(eventId) {
        EventService.delete(eventId);

        fetchEventsData();
    }

    function handleOpen(event) {
        setOpen(true);
        setEventToUpdate(event);
        setCity(event.city);
        setAddress(event.address);
        setDescription(event.description);
        setDateTime(parseDateFromArray(event.dateTime));
        setArtistName(event.artistName);
        setTitle(event.title);
        setLongitude(event.longitude);
        setLatitude(event.latitude);
    }

    const handleClose = () => setOpen(false);

    async function handleUpdateEvent() {
        let event = {
            "city": city,
            "address": address,
            "description": description,
            "dateTime": dateTime.toISOString().replace("Z", ""),
            "artistName": artistName,
            "title": title,
            "longitude": longitude,
            "latitude": latitude,
        }

        await EventService.update(event, eventToUpdate.id);

        await fetchEventsData();

        setOpen(false);
    }

    async function fetchEventsData() {
        let response = await EventService.loadWithPagination(0, 20);
        if (response && response.data.length > 0) {
            setEvents(response.data);
        }
    }

    useEffect(() => {
        fetchEventsData();
    }, []);

    let userTableData = events.map((event) => {
        return (
            <div className="table-row" id={event.id}>
                <div className="table-data">{event.id}</div>
                <div className="table-data">{event.city}</div>
                <div className="table-data">{event.address}</div>
                <div className="table-data">{event.description}</div>
                <div className="table-data">{parseDateFromArray(event.dateTime).toDateString()}</div>
                <div className="table-data">
                    <Button variant="contained" onClick={() => handleDeleteButton(event.id)}>Delete</Button>
                    <Button id="updateEventButton" onClick={() => handleOpen(event)}>Update</Button>
                </div>
            </div>
        )
    })

    function parseDateFromArray(dateArray) {
        return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5], 0);
    }

    return (
        <div className="events-component">
            <div className="container">

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal" sx={{p: 4}}>
                        <Box sx={{textAlign: "center"}}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Update event information
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            sx={{mt: 2}}
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{mt: 2}}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{mt: 2}}
                        />
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                        >
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Выберите дату и время"
                                value={dateTime}
                                onChange={newValue => setDateTime(newValue)}
                                sx={{mt: 2}}
                            />
                        </LocalizationProvider>
                        <TextField
                            fullWidth
                            label="Artist Name"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            sx={{mt: 2}}
                        />
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{mt: 2}}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(parseFloat(e.target.value))}
                            sx={{mt: 2}}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(parseFloat(e.target.value))}
                            sx={{mt: 2}}
                        />

                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                            <Button onClick={handleUpdateEvent} sx={{mt: 2}} variant="contained">
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Modal>

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

export default Events;