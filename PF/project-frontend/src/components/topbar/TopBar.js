import React from 'react';
import * as Constants from '../constants';
import axios from 'axios';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
        this.checkLoginState()
    }

    checkLoginState(){
        let token = localStorage.getItem('Auth')
        if (token === null){
            // something
        }
        else{
            let a = token.split(' ')
            this.checkAuth(a[1])
        }
    }

    checkAuth(token){

        let targetURL = Constants.BASEURL + 'accounts/view/'
        let tokenStr = 'Token ' + token
        let requestData = {
            url: targetURL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenStr
            }
        }

        var comp = this

        axios(requestData)
        .then(function (response){
            let username = response.data['username']
            let imgSrc = response.data['profile_pic'] === null ? null : Constants.BASEURLNOEND + response.data['profile_pic']
            let firstName = response.data['first_name'] === null ? "" : response.data['first_name']
            let lastName = response.data['last_name'] === null ? "" : response.data['last_name']
            let isStaff = response.data['is_staff']
            comp.context.setUserLoggedIn(true)
            comp.context.setUserData({
                imgSrc: imgSrc,
                username: username,
                firstName: firstName,
                lastName: lastName,
                isStaff: isStaff,
                fullUserData: response
            })
        })
        .catch(function (error){
            comp.setState({
                userLoggedIn:false
            })
            localStorage.removeItem('Auth')
        })
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

        return (
            <div>
                <AppBar>
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
                <Toolbar/>
            </div>


        );
    }
}
