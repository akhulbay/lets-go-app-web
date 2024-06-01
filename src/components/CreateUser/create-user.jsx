import "./create-user.css"
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import UserService from "../../services/user-service.js";

function CreateUser() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [rolesOptions, setRolesOptions] = useState([]);

    async function handleCreateUser() {
        let user = {
            "email": email,
            "name": name,
            "role": role,
            "password": password
        }

        await UserService.create(user);

        setEmail('');
        setName('')
        setRole('')
        setPassword('')
    }

    async function fetchRolesData() {
        let data = await UserService.loadRoles();
        if (data && data.length > 0) {
            setRolesOptions(data);
        }
    }

    useEffect(() => {
        fetchRolesData();
    }, []);


    return (
        <div className="user-component">
            <Box className="user-create-component" sx={{p: 2}}>
                <Box sx={{textAlign: "center"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                style={ {
                                    color: "black",
                                }
                                }>
                        Enter user data
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    type="email"
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
                <TextField
                    fullWidth
                    label="Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{mt: 2}}
                />
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                    <Button onClick={handleCreateUser} sx={{mt: 2}} variant="contained">
                        Create
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default CreateUser;