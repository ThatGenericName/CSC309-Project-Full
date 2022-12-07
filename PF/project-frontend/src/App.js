import logo from './logo.svg';
import './App.css';

import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import {
    APIContextProvider
} from "./components/APIContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserLanding} from "./components/user/UserLanding";
import Subscription from "./components/subscriptions/Subscription";
import TopAppBar from "./components/topbar/TopBar";
import {AdminLandingPage} from "./components/Admin/AdminLandingPage";
import {StudiosLanding} from "./components/studios/StudioLanding";
import {NotFound404} from "./components/ErrorPages/404NotFound";
import {
    InternalServerError500
} from "./components/ErrorPages/500InternalServerError";
import Landing from "./components/landingPage/landing";
import {TempTestPage} from "./components/GymClasses/UserEnroll/TempTestPage";

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
                                    <Route path='' element={<Landing/>}/>
                                    <Route path="account/*" element={<UserLanding />} />
                                    <Route path="subscriptions/*" element={<Subscription />} />
                                    <Route path="admin/*" element={<AdminLandingPage />} />
                                    <Route path='studios/*' element={<StudiosLanding/>} />
                                    <Route path='testbed/' element={<TempTestPage/>} />
                                    <Route path='*' element={<NotFound404/>}/>
                                    <Route path='error/500' element={<InternalServerError500/>} />
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
