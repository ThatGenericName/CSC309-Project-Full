import {
    Alert,
    AlertTitle,
    Box,
    ButtonGroup,
    Checkbox,
    Divider,
    Snackbar,
    Stack,
    Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, {useContext, useRef, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {APIContext} from "../APIContextProvider";
import axios from "axios";

import * as Constants from "../constants"
import {useParams} from "react-router-dom";


export default function EditGymClassSchedule(){

    let ctx = useContext(APIContext)

    const { id,id_2 } = useParams()

    const url = Constants.BASEURL + "classes/schedule/" + id_2 + "/edit/"

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

    const [reqSent, setReq] = useState(false)
    const [reqSucess, setreqSucess] = useState(false)


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
        setError(errorsEmpty)
        errorsRef.current = errors
        setReq(false)
        setreqSucess(false)

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

        setError(errorsEmpty)
        errorsRef.current = errors
        setReq(false)
        setreqSucess(false)

        setFormDat(origDat)
    }

    function ShowGeneralMessage(){
        var flag =0

        for (const [k, v] of Object.entries(errors)){
            if(v){
                flag = 1
            }
        }

        if (reqSent && flag === 1 && !reqSucess){
            return (
                <Alert severity="error">
                    <AlertTitle>Please resolve errors</AlertTitle>
                </Alert>
            )
        }
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
        'Date (dd/mm/YY)',
        'Coach ID',
        'Enrollment Capacity',
        'Enrollment Count',
        'Start Time (HH:MM)',
        'End Time (HH:MM)',
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
            errors["date"] = "Wrong Date Format"
            flag = true
        }

        if(formData.enrollment_capacity && !isNumeric(formData.enrollment_capacity)){
            errors["enrollment_capacity"] = "Integer Expected"
            flag = true
        }
        if(formData.enrollment_count && !isNumeric(formData.enrollment_count)){
            errors["enrollment_count"] = "Integer Expected"
            flag = true
        }

        if(formData.start_time && !time_reg.test(formData.start_time)){
                errors["start_time"] = "Wrong Start Time Format"
            flag = true
        }
        if(formData.end_time && !time_reg.test(formData.end_time)){
            errors["end_time"] = "Wrong End Time Format"
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
            {reqSent && ShowGeneralMessage()}

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
