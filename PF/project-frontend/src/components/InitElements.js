import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {APIContextProvider} from "./APIContextProvider";
import TopAppBar from "./topbar/TopBar";



class InitElements extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <TopAppBar>
                {this.props.children}
            </TopAppBar>
        );
    }
}

export default InitElements;
