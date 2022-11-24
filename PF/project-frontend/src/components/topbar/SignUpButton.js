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

import isEmail from 'validator/lib/isEmail';

const REQUIRED_PARAMS = ['username', 'password1', 'password2', 'first_name', 'last_name', 'email']

export default class SignUpButton extends React.Component{
    
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
            }
        
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
    }

    OnSignupSubmit(){
        this.ValidateData()
        
        if (this.state.hasErrors){
            // stuff?
        }
        else{
            let targetURL = Constants.BASEURL + 'accounts/register/'

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
        return (
            <div>
            <Button variant='contained' onClick={() => this.OnClick()}>Sign Up</Button>

            <Dialog 
                open={this.state.openDiag} onClose={() => this.HandleClose()}
                fullWidth={true}
                maxWidth="sm"
                >
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Heres The first text content in dialog
                    </DialogContentText>

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
                        error={this.state.errors.password1.length}
                        type='password'
                        id='password1'
                        label='password'
                        value={this.state.data.password1}
                        onChange={e => this.setFormData({password1: e.target.value})}
                    />
                    <br/><br/>
                    <TextField
                        error={this.state.errors.password2.length}
                        required={true}
                        type='password'
                        id='password2'
                        label='confirm password'
                        value={this.state.data.password2}
                        onChange={e => this.setFormData({password2: e.target.value})}
                    />
                    <br/><br/>
                    <TextField
                        error={this.state.errors.first_name.length}
                        required
                        id='firstname'
                        label='first name'
                        value={this.state.data.first_name}
                        onChange={e => this.setFormData({first_name: e.target.value})}
                    />
                    <br/><br/>
                    <TextField
                        error={this.state.errors.last_name.length}
                        required
                        id='lastname'
                        label='last name'
                        value={this.state.data.last_name}
                        onChange={e => this.setFormData({last_name: e.target.value})}
                    />
                    <br/><br/>
                    <TextField
                        error={this.state.errors.email.length}
                        required
                        id='email'
                        label='email'
                        value={this.state.data.email}
                        onChange={e => this.setFormData({email: e.target.value})}
                    />
                    <br/><br/>
                    <TextField
                        error={this.state.errors.phone_num.length}
                        required
                        id='phonenumber'
                        label='phone number'
                        value={this.state.data.phone_num}
                        onChange={e => this.setFormData({phone_num: e.target.value})}
                    />
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
