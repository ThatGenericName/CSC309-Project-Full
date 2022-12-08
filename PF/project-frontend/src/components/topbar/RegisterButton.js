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

import isEmail from 'validator/lib/isEmail';
import {Alert, AlertTitle, Box, Typography} from '@mui/material';

const REQUIRED_PARAMS = ['username', 'password1', 'password2', 'first_name', 'last_name', 'email']

export default class RegisterButton extends React.Component{

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
                password1: '',
                password2: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_num: ''
            },
            data: {
                username: '',
                password1: '',
                password2: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_num: ''
            },
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
            else{
                errors[key] = ""
            }
        }

        if (!(errors.username.length)){
            // nothing for now?
        }

        if (!(errors.password1.length)){
            if (data.password1.length < 8){
                errors['password1'] = 'Password is too short, must be at least 8 characters'
                hasErrors = true
            }
            if (!(errors.password2.length)){
                if (data.password1 !== data.password2){
                    errors['password2'] = 'Password does not match'
                    hasErrors = true
                }
            }
        }

        if (!(errors.email.length)){
            if (!isEmail(data.email)){
                errors['email'] = 'Please enter a valid email'
                hasErrors = true
            }
        }

        this.setState({errors: errors, hasErrors: hasErrors})
        return hasErrors
    }

    OnSignupSubmit(){
        this.setState({
            axiosLoading: true
        })
        let e = this.ValidateData()

        if (e){
            this.setState({
                axiosLoading: false
            })
        }
        else{
            let targetURL = Constants.BASEURL + 'accounts/register/'
            let dat = this.state.data

            let requestData = {
                url: targetURL,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dat
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
                comp.setState(newData)

                comp.setState({
                    generalMessage: "Registration Successful! Please Sign In"
                })
            })
            .catch(function (error){
                comp.setState({
                    axiosLoading: false
                })
                let a = error.response.data

                let errors = comp.state.errors
                for (let [key, value] of Object.entries(a)){
                    errors[key] = value
                }

                let newData = {
                    reqSent: true,
                    reqSucc: false,
                    reqResp: a
                }

                comp.setState(newData)
            })

            // this delay mechanism taken from https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
        }
    }

    ShowGeneralMessage(){
        if (this.state.reqSucc){
            return (
                <Alert severity="success">
                    <AlertTitle>Registration successful! Please log in</AlertTitle>
                </Alert>
            )
        }
        else{
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
            <MenuItem onClick={() => this.OnClick()}>Register</MenuItem>
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
                    <Typography variant="h3" align="center">Register</Typography>
                </DialogTitle>
                <br/>
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
                            error={Boolean(this.state.errors.username.length)}
                            required
                            id='username'
                            label='username'
                            value={this.state.data.username}
                            onChange={e => this.setFormData({username: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.username}</i>
                        <br/>
                        <TextField
                            error={this.state.errors.password1.length}
                            type='password'
                            id='password1'
                            label='password'
                            value={this.state.data.password1}
                            onChange={e => this.setFormData({password1: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.password1}</i>
                        <br/>
                        <TextField
                            error={this.state.errors.password2.length}
                            required={true}
                            type='password'
                            id='password2'
                            label='confirm password'
                            value={this.state.data.password2}
                            onChange={e => this.setFormData({password2: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.password2}</i>
                        <br/>
                        <TextField
                            error={this.state.errors.first_name.length}
                            required
                            id='firstname'
                            label='first name'
                            value={this.state.data.first_name}
                            onChange={e => this.setFormData({first_name: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.first_name}</i>
                        <br/>
                        <TextField
                            error={this.state.errors.last_name.length}
                            required
                            id='lastname'
                            label='last name'
                            value={this.state.data.last_name}
                            onChange={e => this.setFormData({last_name: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.last_name}</i>
                        <br/>
                        <TextField
                            error={this.state.errors.email.length}
                            required
                            id='email'
                            label='email'
                            value={this.state.data.email}
                            onChange={e => this.setFormData({email: e.target.value})}
                        />
                        <br/>
                        <TextField
                            error={this.state.errors.phone_num.length}
                            required
                            id='phonenumber'
                            label='phone number'
                            value={this.state.data.phone_num}
                            onChange={e => this.setFormData({phone_num: e.target.value})}
                        />
                        <i style={{ color: 'red' }}>{this.state.errors.phone_num}</i>
                        <br/>
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
