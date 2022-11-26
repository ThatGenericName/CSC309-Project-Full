import logo from './logo.svg';
import './App.css';

import React from 'react';

import TopAppBar from './components/topbar/TopBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';

import {
    APIContextProvider
} from "./components/APIContextProvider";
import TempLandingPage from "./components/TempLandingPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserDashboard from "./components/user/UserDashboard";
import Subscription from "./components/subscriptions/Subscription";
import Landing from "./components/landingPage/landing";

const theme = createTheme({
    palette: {
      primary: {
        main: '#fd6114'
      },
      secondary: {
        main: "#2f528f"
      },
    },
});


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="" element={<Landing/>} />
                    <Route path="account" element={<UserDashboard />} />
                    <Route path="subscription" element={<Subscription />} />
                </Route>
            </Routes>
        </BrowserRouter>
        )
    }
}



export default App;
