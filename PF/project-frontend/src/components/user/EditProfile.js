import {
    Alert,
    Box,
    ButtonGroup,
    Divider,
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

import {LOCALE, BASEURL} from "../constants"
import {APIContext} from "../APIContextProvider";
import axios from "axios";


export default function EditProfile(){

    let ctx = useContext(APIContext)
    let userData = ctx.userData.fullUserData

    const [formData, setFormDat] = useState({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_num: userData.phone_num,
        password1: "",
        password2: ""
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
        first_name: "",
        last_name: "",
        email: "",
        phone_num: "",
        password1: "",
        password2: ""
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
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone_num: userData.phone_num,
            password1: "",
            password2: ""
        }
        setFormDat(origDat)
    }

    const reset2 = (key, value) => {
        var origDat = {
            first_name: formDataRef.current.first_name,
            last_name: formDataRef.current.last_name,
            email: formDataRef.current.email,
            phone_num: formDataRef.current.phone_num,
            password1: formDataRef.current.password1,
            password2: formDataRef.current.password2
        }
        origDat[key] = value
        setFormDat(origDat)
    }

    const fieldVars = [
        'first_name',
        'last_name',
        'email',
        'phone_num'
    ]

    const fieldNames = [
        'First Name',
        'Last Name',
        'Email',
        'Phone Number',
    ]

    const passwordVars = [
        'password1',
        'password2'
    ]

    const passwordNames = [
        'Password',
        'Confirm Password'
    ]

    function form(){
        return (
            <React.Fragment>
                {fieldVars.map((fieldID, index) => {
                    var err = Boolean(errorsRef.current[fieldID].length);
                    const label = fieldNames[index]
                    var val = formDataRef.current[fieldID]
                    return (
                        <Stack spacing={0}>
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
                    })
                }
                <Divider/>
                {passwordVars.map((fieldID, index) => {
                    var err = Boolean(errorsRef.current[fieldID].length);
                    const label = passwordNames[index]
                    var val = formDataRef.current[fieldID]
                    return (
                        <Stack spacing={0}>
                            <Box>
                                <TextField
                                    error={err}
                                    label={label}
                                    id={fieldID}
                                    value={val}
                                    type='password'
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
                    })
                }
            </React.Fragment>
            )

    }

    function validate(){
        var errors = {}
        var hasErrors = false

        if (formDataRef.current.password1.length !== 0){
            if (formDataRef.current.password1.length < 8){
                errors['password1'] = 'Password is too short, must be at least 8 characters'
                hasErrors = true
            }
            if (!(formDataRef.current.password2.length)){
                if (formDataRef.current.password1 !== formDataRef.current.password2){
                    errors['password2'] = 'Password does not match'
                    hasErrors = true
                }
            }
        }

        if (formDataRef.current.email.length === 0){
            errors['email'] = "This field is required"
        }
        else if (!isEmail(formDataRef.current.email)){
            errors['email'] = 'Please enter a valid email'
            hasErrors = true
        }

        if (formDataRef.current.phone_num.length !== 0){
            errors['phone_num'] = 'Please enter a valid phone number'
            hasErrors = true
        }

        setError(errors)
        return hasErrors
    }

    function submit(){
        setAxiosLoading(true)
        if (validate()){
            // display error thingy
        }
        else{
            var targetURL = BASEURL + 'accounts/edit/'
            var dat = formData


            var token = ctx.userToken
            token = token.replace("Token ")
            var requestData = {
                url: targetURL,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Token " + token
                },
                data: dat
            }

            axios(requestData)
                .then(function (response){
                    setAxiosLoading(false)
                    // Display thing saying changes saved
                    ctx.updateDataFlag()
                    setSnackbarOpen(true)
                })
                .catch(function(error){
                    var errDat = error.response.data
                    setError(errDat)
                    console.log("mission failed, we get em next time")
                })
        }
    }


    let icon
    if (userData.profile_pic === null || ctx.userData.profile_pic === "") {
        icon = <AccountCircleIcon
            sx={{ width: 128, height: 128 }}
        />
    }
    else{
        icon = <Avatar
            alt={userData.username}
            src={this.state.imgSrc}
            sx={{ width: 256, height: 256 }}
        />
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

            {/*Todo replace the brs with proper formatting*/}
            <br/>
            <Typography variant="h3">{userData.username}</Typography>
            {icon}
            <br/><br/>
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
