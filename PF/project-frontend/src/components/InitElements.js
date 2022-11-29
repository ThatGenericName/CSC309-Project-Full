import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {APIContextProvider} from "./APIContextProvider";
import TopAppBar from "./topbar/TopBar";
import {Box} from "@mui/material";



class InitElements extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Box>
                {this.props.children}
            </Box>
        );
    }
}

export default InitElements;
