import logo from './logo.svg';
import './App.css';

import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import {
    APIContextProvider
} from "./components/APIContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLanding from "./components/user/UserLanding";
import Subscription from "./components/subscriptions/Subscription";
import AddStudio from "./components/Studio/AddStudio";
import EditStudio from "./components/Studio/EditStudio";
import AddAmenity from "./components/Amenity/AddAmenity";
import EditAmenity from "./components/Amenity/EditAmenity";
import AddGymClasses from "./components/GymClasses/AddGymClasses";
import Landing from "./components/landingPage/landing";
import TopAppBar from "./components/topbar/TopBar";
import EditGymClassSchedule from "./components/GymClasses/EditGymClassSchedule";

const theme = createTheme({
    palette: {
      primary: {
        main: '#fd6114'
      },
      secondary: {
        main: "#2f528f"
      },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1536,
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
            <APIContextProvider>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <TopAppBar>
                            <Routes>
                                <Route path="/">
                                    <Route path="account/*" element={<UserLanding />} />
                                    <Route path="subscriptions/*" element={<Subscription />} />
                                </Route>
                            </Routes>
                        </TopAppBar>
                    </BrowserRouter>
                </ThemeProvider>
            </APIContextProvider>
        )
    }
}

export default App;
