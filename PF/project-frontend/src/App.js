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
        let a = 7
        return (
            <ThemeProvider theme={theme}>
                <APIContextProvider>
                    <TopAppBar/>
                    <TempLandingPage/>
                </APIContextProvider>
            </ThemeProvider>
        );
    }
}



export default App;
