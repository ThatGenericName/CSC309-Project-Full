import React from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';

import {APIContext} from "../APIContextProvider";
import * as Constants from '../constants';


export default class LogoutButton extends React.Component{
    static contextType = APIContext
    constructor(props, context){
        super(props, context)
        this.state = {
            reqSent: false,
            reqSucc: false,
            reqResp: null,
            openDiag: false,
            generalMessage: null,
            axiosLoading: false
        }
    }

    HandleClose(){
        this.setOpen(false)
    }

    setOpen(val){
        this.setState({openDiag: val})
    }

    OnClick(){
        this.setOpen(true)
    }

    ShowGeneralMessage(){
        return (
            <Alert severity="error">
                <AlertTitle>{this.state.generalMessage}</AlertTitle>
            </Alert>
        )
    }

    LogOut(){
        this.setState({axionLoading: true})

        let targetURL = Constants.BASEURL + 'accounts/logout/'
        let token = localStorage.getItem('Auth')

        if (token == null){
            let dat = {
                generalMessage: "You are already logged out"
            }
            this.setState(dat)
            return
        }
        token = token.replace("Token ", "")

        let tokenStr = 'Token ' + token
        let requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenStr
            },
        }
        let comp = this
        axios(requestData)
        .then(function (response){
            comp.setState({
                axiosLoading: false
            })
            let newData = {
                reqSent: true,
                reqSucc: true,
                reqResp: response.data,
                generalMessage: null
            }
            console.log(response.status)
            comp.setState(newData)
            localStorage.removeItem('Auth')
            comp.context.setUserLoggedIn(false)
            comp.context.setUserData({
                fullUserData: {},
                username: "",
                firstName: "",
                lastName: "",
                isStaff: false,
                imgSrc: ""
            })
            comp.setOpen(false)
        })
        .catch(function (error){
            comp.setState({
                axiosLoading: false
            })
            let a = error.response.data
            let newData = {
                reqSent: true,
                reqSucc: false,
                reqResp: a,
                generalMessage: 'Something went wrong, please try again later'
            }
            comp.setState(newData)
        })
    }


    render(){
        // Obtained from https://stackoverflow.com/questions/56284497/pressing-tab-key-closes-material-ui-dialog-that-is-opened-from-a-submenu
        // It's use in Dialog in MaterialUI prevents the dialog from closing when you press tab to
        // switch to the next form.

        const stopPropagationForTab = (event) => {
            if (event.key === "Tab") {
              event.stopPropagation();
            }
        };

        const loadingCircle = (
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        )

        return (
            <div>
                <MenuItem onClick={() => this.OnClick()}>Logout</MenuItem>
                <Dialog
                    open={this.state.openDiag} onClose={() => this.HandleClose()}
                    fullWidth={true}
                    maxWidth="sm"
                    onKeyDown={stopPropagationForTab}
                    style={{
                        zIndex: 1401
                    }}
                    >
                    <DialogTitle>
                        Are you sure you want to log out?
                    </DialogTitle>
                    {this.state.axiosLoading && loadingCircle}
                    <DialogContent>
                        <Box
                            noValidate
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              m: 'auto',
                              width: 'fit-content',
                            }}
                        >
                            {this.state.generalMessage !== null && this.ShowGeneralMessage()}
                            <br/>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={() => this.HandleClose()}>Cancel</Button>
                        <Button variant='contained' onClick={() => this.LogOut()}>Logout</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
