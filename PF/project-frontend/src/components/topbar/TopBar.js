import React from 'react';
import * as Constants from '../constants';
import axios from 'axios';
import { SetUserData } from '../constants'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"
import Button from "@mui/material/Button";

import GuestButton from './GuestButton';
import {APIContext} from "../APIContextProvider";
import AccountButton from "./AccountButton";
import {ButtonBase} from "@mui/material";


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
                    position='fixed'
                    style={{
                        zIndex: 1400
                    }}

                >
                    <Toolbar>
                        {/*Todo: Make this a clickable button, probably add an OnClick thing*/}
                        <ButtonBase
                            component={Link}
                            to={'/'}
                        >
                            <Box
                                component="img"
                                sx={{
                                height: 64,
                                }}
                                alt="logo."
                                src="/tfc_notext.png"
                            />
                        </ButtonBase>

                        <Box sx={{ flexGrow: 1, fontStyle:'bold'}}>
                            <Button
                                sx={{color:'#ffffff'}}
                                component={Link}
                                to={'/studios'}
                            >
                                Studios
                            </Button>
                            <Button sx={{color:'#ffffff'}}>
                                Classes
                            </Button>
                            <Button
                                sx={{color:'#ffffff'}}
                                component={Link}
                                to={'/subscriptions'}
                            >
                                Membership
                            </Button>
                        </Box>

                        {this.UserSection()}
                    </Toolbar>
                </AppBar>
                <Toolbar/>

                {this.props.children}
            </div>
        );
    }
}
