import React from 'react';
import * as Constants from '../constants';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

import isEmail from 'validator/lib/isEmail';

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
            OnSignIn: props.onSignIn
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
    }

    OnSignupSubmit(){
        this.ValidateData()
        
        if (this.state.hasErrors){
            // stuff?
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
            })
            .catch(function (error){
                let a = error.response.data
                let newData = {
                    reqSent: true,
                    reqSucc: false,
                    reqResp: a
                }
                console.log('test')
                comp.setState(newData)
            })
            
            if (this.state.reqSucc){
                this.setOpen(false)
            }
            else{
                // more stuff
            }
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

        return (
            <div>
            <MenuItem onClick={() => this.OnClick()}>Sign In</MenuItem>

            <Dialog 
                open={this.state.openDiag} onClose={() => this.HandleClose()}
                fullWidth={true}
                maxWidth="sm"
                onKeyDown={stopPropagationForTab}
                >
                <DialogTitle>Sign In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Something for Signin Dialogue
                    </DialogContentText>
                    <br/>
                    <TextField
                        error={this.state.errors.username.length}
                        required
                        id='username'
                        label='username'
                        value={this.state.data.username}
                        onChange={e => this.setFormData({username: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>    {this.state.errors.username}</i>

                    <br/><br/>
                    <TextField
                        error={this.state.errors.password.length}
                        required
                        type='password'
                        id='password'
                        label='password'
                        value={this.state.data.password}
                        onChange={e => this.setFormData({password: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>    {this.state.errors.password}</i>
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
