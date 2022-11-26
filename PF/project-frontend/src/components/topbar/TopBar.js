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


export default class TopAppBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userLoggedIn: false,
            username: null,
            userfullname: null,
            imgSrc: null,
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
            comp.setState({
                imgSrc: imgSrc,
                userLoggedIn: true,
                username: username,
                firstName: firstName,
                lastName: lastName
            })
        })
        .catch(function (error){
            comp.setState({
                userLoggedIn:false
            })
            localStorage.removeItem('Auth')
        })
    }

    OnUserSignedIn(){
        this.setState({
            userLoggedIn: true,
        })
    }

    ShowLoggedIn(){
        let displayName
        if (this.state.firstName === "" && this.state.lastName === ""){
            displayName = this.state.username
        }
        else {
            displayName = this.state.firstName + " " + this.state.lastName
        }
        let icon
        if (this.state.imgSrc === null) {
            icon = <AccountCircleIcon/>
        }
        else{
            icon = <Avatar alt={displayName} src={this.state.imgSrc}/>
        }

        return (
            <IconButton sx={{ p: 0 }}>
                {icon}
            </IconButton>
        )
    }

    CloseGuestMenu(){
        this.setState({guestMenuOpen: false})
        this.checkLoginState()
    }


    UserSection(){
        if (this.state.userLoggedIn){
            return this.ShowLoggedIn()
        }
        else{
            return (
                <GuestButton onSignIn={() => this.OnUserSignedIn()}/>
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