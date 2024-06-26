import {useState} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/Login/login.jsx";
import Sidebar from "./components/SideBar/side-bar.jsx";
import {MyContext} from "./context";
import Users from "./components/Users/users.jsx";
import Events from "./components/Events/events.jsx";
import CreateUser from "./components/CreateUser/create-user.jsx";
import CreateEvent from "./components/CreateEvent/create-event.jsx";


function App() {

    const {isAuth, setIsAuth} = useState();

    return (
        <>
            <BrowserRouter>
                <MyContext.Provider value={{isAuth, setIsAuth}}>

                    <div className="app">
                        <Sidebar/>
                        <div className="body">
                            <Routes>
                                <Route path="/login" element={<LoginPage setIsAuth={setIsAuth}/>}/>
                                <Route path="/users" element={<Users/>}/>
                                <Route path="/create-user" element={<CreateUser/>}/>
                                <Route path="/events" element={<Events/>}/>
                                <Route path="/create-event" element={<CreateEvent/>}/>
                            </Routes>
                        </div>
                    </div>
                </MyContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App
