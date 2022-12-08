import react from "react";
import React from "react";
import {APIContext} from "../../APIContextProvider";
import {Alert, AlertTitle, Box, Button, Paper, Snackbar, Stack, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";


import {ObjectDeepClone} from "../../Utility";
import {BASEURL} from "../../constants";
import axios from "axios";
import isEmail from "validator/lib/isEmail";

const PARAMS = ['username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'phone_num']
const REQUIRED_PARAMS = ['username', 'password1', 'password2', 'first_name', 'last_name', 'email']
const PARAMS_SET_1 = ['username', 'first_name', 'last_name', 'email']
const PARAMS_SET_2 = ['password1', 'password2']
const PARAMS_SET_3 = ['phone_num']
const PARAM_TO_NAME = {
    username: "Username",
    password1: 'Password',
    password2: 'Confirm Password',
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email',
    phone_num: 'Phone Number'
}

export class Register extends react.Component {
    static contextType = APIContext

    constructor(props, context) {
        super(props, context);
        this.state = {
            inputData: {
                username: '',
                password1: '',
                password2: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_num: ''
            },
            errors: {
                username: '',
                password1: '',
                password2: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_num: ''
            },
            hasErrors: false,
            snackbarOpen: false
        }
    }

    setFormDataStr(key, value) {
        var dat = {}
        dat[key] = value
        this.setFormData(dat)
    }

    setFormData(obj) {
        var clone = ObjectDeepClone(this.state.inputData)
        Object.keys(obj).forEach(k => {
            clone[k] = obj[k]
        })
        this.setState({inputData: clone})
    }

    setErrorData(obj) {
        var clone = ObjectDeepClone(this.state.errors)
        Object.keys(obj).forEach(k => {
            clone[k] = obj[k]
        })
        this.setState({errors: clone})
    }

    ValidateData() {
        let data = this.state.inputData
        let errors = this.state.errors
        let hasErrors = false
        for (let [key, value] of Object.entries(data)) {

            if (!(value.length) && REQUIRED_PARAMS.includes(key)) {
                errors[key] = "This Field is required"
                hasErrors = true
            }
        }

        if (!(errors.username.length)) {
            // nothing for now?
        }

        if (!(errors.password1.length)) {
            if (data.password1.length < 8) {
                errors['password1'] = 'Password is too short, must be at least 8 characters'
                hasErrors = true
            }
            if (!(errors.password2.length)) {
                if (data.password1 !== data.password2) {
                    errors['password2'] = 'Password does not match'
                    hasErrors = true
                }
            }
        }

        if (!(errors.email.length)) {
            if (!isEmail(data.email)) {
                errors['email'] = 'Please enter a valid email'
                hasErrors = true
            }
        }

        this.setState({errors: errors, hasErrors: hasErrors})
        return hasErrors
    }

    sendData(comp) {
        const e = comp.ValidateData()
        if (e) {
            // make it show errors
            return
        }
        const targetURL = BASEURL + 'accounts/register/'

        const formDat = new FormData()

        Object.entries(this.state.inputData).forEach((kvp) => {
            formDat.set(kvp[0], kvp[1])
        })

        const requestData = {
            url: targetURL,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formDat
        }
        axios(requestData).then(function (response) {
            // Make it show a success or smtg
            comp.setState({snackbarOpen: true})
            if (comp.props.onSend !== undefined) {
                comp.props.onSend()
            }
        }).catch(function (error) {
            let a = 1
        })
    }

    ShowGeneralMessage() {
        if (this.state.reqSent) {
            if (!this.state.reqSucc) {
                return (
                    <Alert severity="error">
                        <AlertTitle>Account or Password does not match</AlertTitle>
                    </Alert>
                )
            }
        } else if (this.state.hasErrors) {
            return (
                <Alert severity="error">
                    <AlertTitle>Please resolve errors</AlertTitle>
                </Alert>
            )
        }
    }


    render() {
        const vertical = 'bottom'
        const horizontal = 'center';

        return (
            <Paper
                sx={{p: 2}}
                variant='outlined'
            >
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    autoHideDuration={8000}
                    open={this.state.snackbarOpen}
                    onClose={function () {
                        this.setState({snackbarOpen: false})
                    }}
                >
                    <Alert
                        onClose={function () {
                            this.setState({snackbarOpen: false})
                        }}
                        severity="success"
                        sx={{width: '100%'}}>
                        Success, Please Log In
                    </Alert>
                </Snackbar>
                <Stack spacing={2}>
                    <Typography variant='h3'>
                        Join Today!
                    </Typography>
                    <Box>
                        {this.state.reqSent && this.ShowGeneralMessage()}
                        <br/>
                    </Box>
                    <Stack>
                        <TextField
                            error={Boolean(this.state.errors.username.length)}
                            required
                            id={"username"}
                            label={PARAM_TO_NAME.username}
                            value={this.state.inputData.username}
                            onChange={e => this.setFormData({username: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.username}</i>
                    </Stack>
                    <Stack>
                        <TextField
                            error={Boolean(this.state.errors.password1.length)}
                            required
                            type='password'
                            id={"password1"}
                            label={PARAM_TO_NAME.password1}
                            value={this.state.inputData.password1}
                            onChange={e => this.setFormData({password1: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.password1}</i>
                    </Stack>
                    <Stack>
                        <TextField
                            error={Boolean(this.state.errors.password2.length)}
                            required
                            type='password'
                            id={"password2"}
                            label={PARAM_TO_NAME.password2}
                            value={this.state.inputData.password2}
                            onChange={e => this.setFormData({password2: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.password2}</i>
                    </Stack>
                    <Stack>
                        <TextField
                            error={Boolean(this.state.errors.first_name.length)}
                            required
                            id={"first_name"}
                            label={PARAM_TO_NAME.first_name}
                            value={this.state.inputData.first_name}
                            onChange={e => this.setFormData({first_name: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.first_name}</i>
                    </Stack>
                    <Stack>
                        <TextField
                            error={Boolean(this.state.errors.last_name.length)}
                            required
                            id={"last_name"}
                            label={PARAM_TO_NAME.last_name}
                            value={this.state.inputData.last_name}
                            onChange={e => this.setFormData({last_name: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.last_name}</i>
                    </Stack>
                    <Stack>
                        <TextField
                            error={Boolean(this.state.errors.email.length)}
                            required
                            id={"email"}
                            label={PARAM_TO_NAME.email}
                            value={this.state.inputData.email}
                            onChange={e => this.setFormData({email: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.email}</i>
                    </Stack>
                    <Stack>
                        <TextField
                            error={Boolean(this.state.errors.phone_num.length)}
                            id={"phone_num"}
                            label={PARAM_TO_NAME.phone_num}
                            value={this.state.inputData.phone_num}
                            onChange={e => this.setFormData({phone_num: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.phone_num}</i>
                    </Stack>
                    <Box>
                        <Button
                            variant='contained'
                            onClick={() => this.sendData(this)}
                        >
                            Submit
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        )
    }

}
