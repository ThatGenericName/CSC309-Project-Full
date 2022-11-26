import React from 'react';
import * as Constants from '../constants';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';

const REQUIRED_PARAMS = ['username', 'password']

export default class SignInButton extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            reqSent: false,
            reqSucc: false,
            reqResp: null,
            openDiag: false,
            hasErrors: false,
            errors: {
                username: '',
                password: '',
            },
            data: {
                username: '',
                password: '',
            },
            OnSignIn: props.onSignIn,
            generalMessage: "",
            axiosLoading: false
        }
    }

    HandleClose(){
        this.setOpen(false)
    }

    setOpen(val){
        this.setState({openDiag: val})
    }

    setFormData(change){
        let dat = this.state.data
        for (let [key, value] of Object.entries(change)){
            dat[key] = value
        }
        this.setState({data: dat})
    }

    setErrorData(change){
        let dat = this.state.errors
        for (let [key, value] of Object.entries(change)){
            dat[key] = value
        }
        this.setState({errors: dat})
    }


    OnClick(){
        this.setOpen(true)
    }


    ValidateData(){
        let data = this.state.data
        let errors = this.state.errors
        let hasErrors = false
        for (let [key, value] of Object.entries(data)){
            
            if (!(value.length) && REQUIRED_PARAMS.includes(key)){
                errors[key] = "This Field is required"
                hasErrors = true
            }
        }

        this.setState({errors: errors, hasErrors: hasErrors})
        return hasErrors
    }

    OnSignupSubmit(){
        this.setState({axionLoading: true})
        let e = this.ValidateData()
        
        if (e){
            this.setState({
                axiosLoading: false
            })
        }
        else{
            let targetURL = Constants.BASEURL + 'accounts/login/'

            let requestData = {
                url: targetURL,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: this.state.data
            }
    
            var comp = this
    
            axios(requestData)
            .then(function (response){
                comp.setState({
                    axiosLoading: false
                })
                let newData = {
                    reqSent: true,
                    reqSucc: true,
                    reqResp: response.data
                }
                console.log(response.status)
                comp.setState(newData)
                localStorage.setItem('Auth', response.data.detail)
                if (comp.state.OnSignIn !== null){
                    comp.state.OnSignIn()
                }
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
                    reqResp: a
                }
                comp.setState(newData)
                
            })
        }
    }

    ShowGeneralMessage(){
        if (this.state.reqSent){
            if (!this.state.reqSucc){
                return (
                    <Alert severity="error">
                        <AlertTitle>Account or Password does not match</AlertTitle>
                    </Alert>
                )
            }
        }
        else if (this.state.hasErrors) {
            return (
                <Alert severity="error">
                    <AlertTitle>Please resolve errors</AlertTitle>
                </Alert>
            )
        }
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
            <MenuItem onClick={() => this.OnClick()}>Sign In</MenuItem>

            <Dialog 
                open={this.state.openDiag} onClose={() => this.HandleClose()}
                fullWidth={true}
                maxWidth="sm"
                onKeyDown={stopPropagationForTab}
                >
                <DialogTitle>
                    <Typography variant="h3" align="center">Sign In</Typography>
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
                        {this.state.reqSent && this.ShowGeneralMessage()}
                        <br/>
                    </Box>

                    <Box
                        noValidate
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          m: 'auto',
                          width: 'fit-content',
                        }}
                    >
                        <TextField
                            error={this.state.errors.username.length}
                            required
                            id='username'
                            label='username'
                            value={this.state.data.username}
                            onChange={e => this.setFormData({username: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.username}</i>
                        <br/>
                        <TextField
                            error={this.state.errors.password.length}
                            required
                            type='password'
                            id='password'
                            label='password'
                            value={this.state.data.password}
                            onChange={e => this.setFormData({password: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.password}</i>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={() => this.HandleClose()}>Cancel</Button>
                    <Button variant='contained' onClick={() => this.OnSignupSubmit()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
        )
    }
}
