import {
    Alert,
    Box,
    ButtonGroup, Checkbox,
    Divider, Input,
    Snackbar,
    Stack,
    Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, {useContext, useRef, useState} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import {APIContext} from "../APIContextProvider";
import axios from "axios";
import FormData from 'form-data'

import {LOCALE, BASEURL, BASEURLNOEND} from "../constants"
import {useParams} from "react-router-dom";
import * as Constants from "../constants";


export default function EditGymClassSchedule(){

    let ctx = useContext(APIContext)

    const { id } = useParams()

    const url = Constants.BASEURL + "classes/schedule/" + id + "/edit/"

    let GymClassScheduleData = {
        date: "",
        coach: "",
        enrollment_capacity: "",
        enrollment_count: "",
        start_time: "",
        end_time: "",
        is_cancelled: ""
    }

    const [formData, setFormDat] = useState({
        date: GymClassScheduleData.date,
        coach: GymClassScheduleData.coach,
        enrollment_capacity: GymClassScheduleData.enrollment_capacity,
        enrollment_count: GymClassScheduleData.enrollment_count,
        start_time: GymClassScheduleData.start_time,
        end_time: GymClassScheduleData.end_time,
        is_cancelled: GymClassScheduleData.is_cancelled,
    })


    const formDataRef = useRef({})
    formDataRef.current = formData

    const setFormData = (key) => {
        return (event) => {
            let datDict = formData
            datDict[key] = event.target.value
            setFormDat(datDict)
        }
    }

    const errorsEmpty = {
        date: "",
        coach: "",
        enrollment_capacity: "",
        enrollment_count: "",
        start_time: "",
        end_time: "",
        is_cancelled: ""
    }

    const [errors, setErr] = useState(errorsEmpty)

    const errorsRef = useRef({})
    errorsRef.current = errors


    // Aloha Snackbar

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    // Loading Thingy
    const [axiosLoading, setAxiosLoading] = useState(false)

    function setError(obj){
        var errorDict = errorsEmpty
        for (const [k, v] of Object.entries(obj)){
            errorDict[k] = v
        }
        setErr(errorDict)
    }

    const reset = () => {
        var origDat = {
            date: GymClassScheduleData.date,
            coach: GymClassScheduleData.coach,
            enrollment_capacity: GymClassScheduleData.enrollment_capacity,
            enrollment_count: GymClassScheduleData.enrollment_count,
            start_time: GymClassScheduleData.start_time,
            end_time: GymClassScheduleData.end_time,
            is_cancelled: GymClassScheduleData.is_cancelled,
        }
        setFormDat(origDat)
    }

    const reset2 = (key, value) => {
        var origDat = {
            date: formDataRef.current.date,
            coach: formDataRef.current.coach,
            enrollment_capacity: formDataRef.current.enrollment_capacity,
            enrollment_count: formDataRef.current.enrollment_count,
            start_time: formDataRef.current.start_time,
            end_time: formDataRef.current.end_time,
            is_cancelled: formDataRef.current.is_cancelled,
        }
        origDat[key] = value
        setFormDat(origDat)
    }

    const fieldVars = [
        'date',
        'coach',
        'enrollment_capacity',
        'enrollment_count',
        'start_time',
        'end_time',
        'is_cancelled'
    ]

    const fieldNames = [
        'Date',
        'Coach ID',
        'Enrollment Capacity',
        'Enrollment Count',
        'Start Time',
        'End Time',
        'Cancel'
    ]

    function form(){
        return (
            <React.Fragment>
                {fieldVars.map((fieldID, index) => {
                    var err = Boolean(errorsRef.current[fieldID].length);
                    const label = fieldNames[index]
                    var val = formDataRef.current[fieldID]
                    if(fieldID !== 'is_cancelled'){
                        return (
                        <Stack spacing={0} key={fieldID} >
                            <Box>
                                <TextField
                                    error={err}
                                    label={label}
                                    id={fieldID}
                                    value={val}
                                    onChange={e => reset2(fieldID, e.target.value)}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                />
                            </Box>
                            <Box>
                                <i style={{ color: 'red'}}>{errorsRef.current[fieldID]}</i>
                            </Box>
                        </Stack>
                        )
                    }
                    else{
                        return (
                        <Stack spacing={0} key={fieldID} >
                            <Box>
                                {/*<div>*/}
                                    <label> Cancel: </label>
                                    <Checkbox
                                    // error={err}
                                    id={fieldID}
                                    onChange={e => reset2(fieldID, e.target.checked)}
                                     />
                            </Box>
                            <Box>
                                <i style={{ color: 'red'}}>{errorsRef.current[fieldID]}</i>
                            </Box>
                        </Stack>
                        )
                    }
                    })
                }

            </React.Fragment>
            )

    }
    function isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
             !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    function validate(){
        var d_reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        var time_reg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        var flag = false

        if (formData.date && !d_reg.test(formData.date)){
            console.log("error")
            flag = true
        }

        if(formData.enrollment_capacity && !isNumeric(formData.enrollment_capacity)){
            console.log("error")
            flag = true
        }
        if(formData.enrollment_count && !isNumeric(formData.enrollment_count)){
            console.log("error")
            flag = true
        }

        if(formData.start_time && !time_reg.test(formData.start_time)){
            console.log("error")
            flag = true
        }
        if(formData.end_time && !time_reg.test(formData.end_time)){
            console.log("error")
            flag = true
        }
        return flag
    }

    function submit() {
        setAxiosLoading(true)

        // validate()
        // // return

        if(validate()){
            console.log("error")
        }
        else{
            var targetURL = url
            var dat = formData


            // var token = ctx.userToken
            // token = token.replace("Token ")
            var requestData = {
                url: targetURL,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: "Token " + token
                },
                data: dat
            }

            axios(requestData)
                .then(function (response) {
                    setAxiosLoading(false)
                    // Display thing saying changes saved
                    ctx.updateDataFlag()
                    setSnackbarOpen(true)
                })
                .catch(function (error) {
                    var errDat = error.response.data
                    setError(errDat)
                    console.log("mission failed, we get em next time")
                })
        }
    }



    const vertical = 'bottom'
    const horizontal = 'center';


    return (
        <Paper elevation={3} sx={{textAlign:'center'}}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={8000}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>

            <Box sx={{p:2}}>
                <Typography variant="h3">Edit GymClassSchedule</Typography>
            </Box>
            <Divider/>

            <Stack spacing={4} sx={{p:4}}>
                {form()}
                <Box sx={{textAlign: 'center'}}>
                    <ButtonGroup variant="contained">
                        <Button onClick={reset}>Reset</Button>
                        <Button onClick={submit}>Confirm</Button>
                    </ButtonGroup>
                </Box>
            </Stack>
        </Paper>
    )
}
