import {useEffect, useState} from "react";
import UserService from "../../services/user-service.js";
import "./users.scss"
import AuthService from "../../services/auth-service.js";
import {useNavigate} from "react-router-dom";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";

function Users() {

    let navigate = useNavigate();

    if (!AuthService.isAuthenticated()) {
        navigate("/login");
    }

    const [users, setUsers] = useState([]);
    const [userToUpdate, setUserToUpdate] = useState();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [rolesOptions, setRolesOptions] = useState([]);

    const handleOpen = (user) => {
        setOpen(true);
        setUserToUpdate(user)
        setName(user.name);
        setRole(user.role);
        setEmail(user.email);
    }
    const handleClose = () => setOpen(false);

    async function fetchUsersData() {
        let data = await UserService.loadWithPagination(0, 20);
        if (data && data.length > 0) {
            setUsers(data);
        }
    }

    async function fetchRolesData() {
        let data = await UserService.loadRoles();
        if (data && data.length > 0) {
            setRolesOptions(data);
        }
    }

    useEffect(() => {
        fetchUsersData();
    }, []);

    useEffect(() => {
        fetchRolesData();
    }, []);

    async function handleBlockButton(e, userId) {
        e.preventDefault();

        let user = {
            "isBlocked": true
        }

        await UserService.update(user, userId);

        fetchUsersData();
    }

    async function handleUnblockButton(e, userId) {
        e.preventDefault();

        let user = {
            "isBlocked": false
        }

        await UserService.update(user, userId);

        fetchUsersData();
    }

    async function handleUpdateUser() {
        let user = {
            "email": email,
            "name": name,
            "role": role,
        }

        await UserService.update(user, userToUpdate.id);

        fetchUsersData();
    }

    let userTableData = users.map((user) => {
        return (
            <div className="table-row" id={user.id}>
                <div className="table-data">{user.id}</div>
                <div className="table-data">{user.name}</div>
                <div className="table-data">{user.email}</div>
                <div className="table-data">{user.role}</div>
                <div className="table-data">
                    {
                        user.isBlocked ?
                            <Button variant="contained" onClick={e => handleUnblockButton(e, user.id)}>Unblock</Button>
                            :
                            <Button variant="contained" onClick={e => handleBlockButton(e, user.id)}>Block</Button>
                    }
                    <Button id="updateButton" onClick={() => handleOpen(user)}>Update</Button>
                </div>
            </div>
        )
    })

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
                                Update your information
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{mt: 2}}
                        />
                        <TextField
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{mt: 2}}
                        />
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={role}
                                label="Role"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {rolesOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                            <Button onClick={handleUpdateUser} sx={{mt: 2}} variant="contained">
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <div className="table">
                    <div className="table-header">
                        <div className="header__item"><a id="name" className="filter__link" href="#">ID</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number"
                                                         href="#">Name</a></div>
                        <div className="header__item"><a id="draws" className="filter__link filter__link--number"
                                                         href="#">Email</a></div>
                        <div className="header__item"><a id="losses" className="filter__link filter__link--number"
                                                         href="#">Role</a></div>
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

export default Users;