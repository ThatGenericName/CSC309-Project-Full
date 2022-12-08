import React, {Component} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Alert, AlertTitle, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as Constants from "../constants";
import axios from "axios";
import {APIContext} from "../APIContextProvider";

const REQUIRED_PARAMS = ['name', 'address', 'post_code', 'phone_num']

export default class AddAmenity extends Component {
    static contextType = APIContext

    constructor(props, context) {

        super(props, context)

        this.state = {
            reqSent: false,
            reqSucc: false,
            reqResp: null,
            hasErrors: false,
            studioId: window.location.href.split('/')[4],
            errors: {
                type: '',
                quantity: ''
            },
            data: {
                type: '',
                quantity: ''

            },
            generalMessage: "",
            axiosLoading: false

        }
    }

    setFormData(change) {
        let dat = this.state.data
        for (let [key, value] of Object.entries(change)) {
            dat[key] = value
        }

        this.setState({data: dat})
    }


    ShowGeneralMessage() {
        if (this.state.reqSucc) {
            return (
                <Alert severity="success">
                    <AlertTitle>Amenity Added successfully to studio</AlertTitle>
                </Alert>
            )
        } else {
            return (
                <Alert severity="error">
                    <AlertTitle>Please resolve errors</AlertTitle>
                </Alert>
            )
        }
    }

    ValidateData() {
        let data = this.state.data
        let errors = this.state.errors
        let hasErrors = false
        for (let [key, value] of Object.entries(data)) {

            if (!(value.length) && REQUIRED_PARAMS.includes(key)) {
                errors[key] = "This Field is required"
                hasErrors = true
            } else {
                errors[key] = ""
            }
        }

        this.setState({errors: errors, hasErrors: hasErrors})
        return hasErrors
    }

    OnSignupSubmit() {
        this.setState({
            axiosLoading: true
        })
        let e = this.ValidateData()

        if (e) {
            this.setState({
                axiosLoading: false
            })
        } else {
            let dat = this.state.data

            let targetURL = Constants.BASEURL + 'studios/' + this.state.studioId + '/amenities/add/'

            var token = this.context.userToken
            if (token === null || token === undefined) {
                return
            }
            console.log(token)
            token = token.replace("Token ", "")

            let requestData = {
                url: targetURL,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + token
                },
                data: dat
            }

            var comp = this

            axios(requestData)
                .then(function (response) {
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
                        generalMessage: "Amenity Added Successfully"
                    })
                })
                .catch(function (error) {
                    comp.setState({
                        axiosLoading: false
                    })
                    let a = error.response.data

                    let errors = comp.state.errors
                    for (let [key, value] of Object.entries(a)) {
                        errors[key] = value
                    }

                    let newData = {
                        reqSent: true,
                        reqSucc: false,
                        reqResp: a
                    }

                    comp.setState(newData)
                })


        }
    }

    render() {
        return (
            <div>
                <br/>
                <Typography variant="h3" align="center">Add Amenity</Typography>
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
                        error={!!(this.state.errors.type.length)}
                        required
                        type='text'
                        id='type'
                        label='Amenity Type'
                        onChange={e => this.setFormData({type: e.target.value})}
                    />

                    <i style={{color: 'red'}}>{this.state.errors.type}</i>
                    <br/>
                    <TextField
                        error={!!(this.state.errors.quantity.length)}
                        required
                        type='number'
                        id='quantity'
                        label='Quantity'
                        onChange={e => this.setFormData({quantity: e.target.value})}
                    />
                    <i style={{color: 'red'}}>{this.state.errors.quantity}</i>
                    <br/>


                    <Button variant='contained'
                            onClick={() => this.OnSignupSubmit()}>Submit</Button>

                </Box>

            </div>
        )
    }
}
