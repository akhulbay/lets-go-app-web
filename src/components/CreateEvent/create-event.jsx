import "./create-event.css"
import {Box, Button, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {useState} from "react";
import EventService from "../../services/event-service.js";

function CreateEvent() {

    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [artistName, setArtistName] = useState('');
    const [title, setTitle] = useState('');
    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);
    const [banner, setBanner] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0]; // Получаем файл из input
        if (file) {
            setBanner(file); // Сохраняем файл в состояние
        }
    }

    async function handleCreateEvent() {
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

        await EventService.create(event, banner);

        setCity('')
        setAddress('')
        setDescription('')
        setDateTime(new Date())
        setArtistName('')
        setTitle('')
        setLongitude(0.0)
        setLatitude(0.0)
        setBanner(null)
    }

    return (
        <div className="events-component">
            <Box className="crete-event-component" sx={{p: 4}}>
                <Box sx={{textAlign: "center"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{
                        color: 'black'
                    }}>
                        Enter event data
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

                <Button
                    variant="contained"
                    component="label"
                    sx={{mt: 2}}
                    style={{
                        backgroundColor: 'green'
                    }}
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                    <Button onClick={handleCreateEvent} sx={{mt: 2}} variant="contained">
                        Create
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default CreateEvent;