import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {APIContextProvider} from "./APIContextProvider";
import TopAppBar from "./topbar/TopBar";


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


class InitElements extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <APIContextProvider>
                    <TopAppBar/>
                    {this.props.children}
                </APIContextProvider>
            </ThemeProvider>
        );
    }
}

export default InitElements;
