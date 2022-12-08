import React, {Component} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Alert, AlertTitle, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as Constants from "../constants";
import axios from "axios";

const REQUIRED_PARAMS = ["name", "coach", "description", "keywords", "earliest_date", "last_date",
                "day", "start_time", "end_time", "enrollment_capacity"]

export default class AddGymClasses extends Component{

    constructor(props){

        super(props)

        this.state = {
            reqSent: false,
            reqSucc: false,
            reqResp: null,
            hasErrors: false,
            studioId : window.location.href.split('/')[4],
            errors: {
                name: '',
                coach: '',
                description: '',
                keywords: '',
                earliest_date: '',
                last_date: '',
                day: '',
                start_time: '',
                end_time: '',
                enrollment_capacity: ''
            },
            data: {
                name: '',
                coach: '',
                description: '',
                keywords: '',
                earliest_date: '',
                last_date: '',
                day: '',
                start_time: '',
                end_time: '',
                enrollment_capacity: 0
            },
            generalMessage: "",
            axiosLoading: false

        }

    }


    setFormData(change){
        let dat = this.state.data
        for (let [key, value] of Object.entries(change)){
            dat[key] = value
        }
        let emptyErrors = {
            name: '',
            coach: '',
            description: '',
            keywords: '',
            earliest_date: '',
            last_date: '',
            day: '',
            start_time: '',
            end_time: '',
            enrollment_capacity: ''
        }


        this.setState({data: dat, errors: emptyErrors})
    }


    ShowGeneralMessage(){
        if (this.state.reqSucc){
            return (
                <Alert severity="success">
                    <AlertTitle>Gym Class Added successfully to studio</AlertTitle>
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

    ValidateData(){
        let data = this.state.data
        let errors = this.state.errors
        let hasErrors = false
        for (let [key, value] of Object.entries(data)){

            if (!((value.length)) && REQUIRED_PARAMS.includes(key)){
                errors[key] = "This Field is required"
                hasErrors = true
            }
            else{
                errors[key] = ""
            }

        }

        if(errors["enrollment_capacity"] === "" && data["enrollment_capacity"] < 1){
            errors["enrollment_capacity"] = "Enrollment Capacity should be >= 1"
            hasErrors = true
        }

        if(errors["data"] === "" && !['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                                   'Friday', 'Saturday', 'Sunday'].includes(data["day"])){
            errors["day"] = "Wrong day name"
            hasErrors = true
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
            let dat = this.state.data
            let targetURL = Constants.BASEURL + 'classes/' + this.state.studioId +'/create/'



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
                    generalMessage: "Gym Class Added Successfully"
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


        }
    }
    render() {
        return (
            <div>
                <br/>
                <Typography variant="h3" align="center">Add GymClasses</Typography>
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
                        error={!!(this.state.errors.name.length)}
                        required
                        type='text'
                        id='name'
                        label='GymClass Name'
                        onChange={e => this.setFormData({name: e.target.value})}
                    />

                    <i style={{ color: 'red' }}>{this.state.errors.name}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.coach.length)}
                        required
                        type='number'
                        id='coach'
                        label='Coach Id'
                        onChange={e => this.setFormData({coach: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.coach}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.description.length)}
                        required
                        type='text'
                        id='description'
                        label='GymClass Description'
                        onChange={e => this.setFormData({description: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.description}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.keywords.length)}
                        required
                        type='text'
                        id='keywords'
                        label='Keywords'
                        onChange={e => this.setFormData({keywords: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.keywords}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.earliest_date.length)}
                        required
                        type='text'
                        id='earliest_date'
                        label='Start Date (dd/mm/YY)'
                        onChange={e => this.setFormData({earliest_date: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.earliest_date}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.last_date.length)}
                        required
                        type='text'
                        id='last_date'
                        label='Last Date (dd/mm/YY)'
                        onChange={e => this.setFormData({last_date: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.last_date}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.day.length)}
                        required
                        type='text'
                        id='day'
                        label='Day'
                        onChange={e => this.setFormData({day: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.day}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.start_time.length)}
                        required
                        type='text'
                        id='start_time'
                        label='Start Time (HH:MM)'
                        onChange={e => this.setFormData({start_time: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.start_time}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.end_time.length)}
                        required
                        type='text'
                        id='end_time'
                        label='End Time (HH:MM)'
                        onChange={e => this.setFormData({end_time: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.end_time}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.enrollment_capacity.length)}
                        required
                        type='number'
                        id='enrollment_capacity'
                        label='Enrollment Capacity'
                        onChange={e => this.setFormData({enrollment_capacity: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.enrollment_capacity}</i>
                    <br/>


                    <Button variant='contained' onClick={() => this.OnSignupSubmit()}>Submit</Button>

                    </Box>

            </div>
        )
    }
}
