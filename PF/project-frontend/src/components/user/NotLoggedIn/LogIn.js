import react from "react";
import React from "react";
import {APIContext} from "../../APIContextProvider";
import {Alert, AlertTitle, Box, Button, Paper, Stack, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";


import {ObjectDeepClone} from "../../Utility";
import {BASEURL} from "../../constants";
import axios from "axios";


const REQUIRED_PARAMS = ['username', 'password']

export class LogIn extends react.Component {
    static contextType = APIContext

    constructor(props, context) {
        super(props, context);
        this.state = {
            inputData: {
                username: "",
                password: ""
            },
            errors: {
                username: "",
                password: ""
            },
            hasErrors: false
        }
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

        Object.entries(data).forEach((kvp) => {
            if (!Boolean(kvp[1].length) && REQUIRED_PARAMS.includes(kvp[0])) {
                errors[kvp[0]] = 'This Field Is Required'
                hasErrors = true
            }
        })

        this.setState({errors: errors, hasErrors: hasErrors})
        return hasErrors
    }

    sendData(comp) {
        const e = comp.ValidateData()
        if (e) {
            // make it show errors
            return
        }
        const targetURL = BASEURL + 'accounts/login/'

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
            var token = response.data.detail
            token = token.replace('Token ', '')
            localStorage.setItem('Auth', token)
            if (localStorage.getItem('Auth') !== token) {
                throw "Auth Token not saved!"
            }
            comp.context.setUserToken(token)
            comp.context.updateDataFlag()
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
        return (
            <Paper
                variant='outlined'
                sx={{p: 2}}
            >
                <Stack spacing={2}>
                    <Typography variant='h3'>
                        Sign in!
                    </Typography>
                    <Box>
                        {this.state.reqSent && this.ShowGeneralMessage()}
                        <br/>
                    </Box>
                    <Stack>
                        <TextField
                            error={this.state.errors.username.length}
                            required
                            id='username'
                            label='username'
                            value={this.state.inputData.username}
                            onChange={e => this.setFormData({username: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.username}</i>
                    </Stack>
                    <Stack>
                        <TextField
                            error={this.state.errors.password.length}
                            required
                            type='password'
                            id='password'
                            label='password'
                            value={this.state.inputData.password}
                            onChange={e => this.setFormData({password: e.target.value})}
                        />
                        <i style={{color: 'red'}}>{this.state.errors.password}</i>
                    </Stack>
                    <Box>
                        <Button
                            variant='contained'
                            onClick={e => this.sendData(this)}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        )
    }

}
