import React from 'react';
import * as Constants from '../constants';
import axios from 'axios';
import { SetUserData } from '../constants'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import GuestButton from './GuestButton';
import {APIContext} from "../APIContextProvider";
import AccountButton from "./AccountButton";


export default class TopAppBar extends React.Component{
    static contextType = APIContext
    constructor(props, context){
        super(props, context)
        this.state = {
            anchorEl: null
        }
    }

    UserSection(){
        if (this.context.userLoggedIn){
            return (
                <AccountButton/>
            )
        }
        else{
            return (
                <GuestButton/>
            )
        }
    }

    render(){
        let a = 1
        return (
            <div>
                <AppBar
                    position='relative'
                    style={{
                        zIndex: 1400
                    }}

                >
                    <Toolbar>
                        {/*Todo: Make this a clickable button, probably add an OnClick thing*/}
                        <Box
                            component="img"
                            sx={{
                            height: 64,
                            }}
                            alt="logo."
                            src="/tfc_notext.png"
                        />

                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Toronto Fitness Club
                      </Typography>
                      {this.UserSection()}
                    </Toolbar>
                </AppBar>

                {this.props.children}
            </div>
        );
    }
}
