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
        <APIContextProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route path="" element={<Landing/>} />
                            <Route path="account" element={<UserLanding />} />
                            <Route path="subscription" element={<Subscription />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </APIContextProvider>
        )
    }
}

export default App;
