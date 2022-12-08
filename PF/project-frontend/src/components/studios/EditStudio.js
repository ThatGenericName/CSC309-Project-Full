import {
    Alert,
    AlertTitle,
    Box,
    ButtonGroup,
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
import FormData from 'form-data'

import * as Constants from "../constants"
import {useParams} from "react-router-dom";


export default function EditStudio() {

    let ctx = useContext(APIContext)

    const {id} = useParams()

    const url = Constants.BASEURL + "studios/" + id + "/edit/"

    let studioData = {
        name: "",
        address: "",
        post_code: "",
        phone_num: ""
    }

    const [formData, setFormDat] = useState({
        name: studioData.name,
        address: studioData.address,
        post_code: studioData.post_code,
        phone_num: studioData.phone_num,
        images: []
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
        name: "",
        address: "",
        post_code: "",
        phone_num: "",
        images: ""
    }

    const [errors, setErr] = useState(errorsEmpty)

    const errorsRef = useRef({})
    errorsRef.current = errors


    // Aloha Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    // Loading Thingy
    const [axiosLoading, setAxiosLoading] = useState(false)

    function setError(obj) {
        var errorDict = errorsEmpty
        for (const [k, v] of Object.entries(obj)) {
            errorDict[k] = v
        }
        setErr(errorDict)
    }

    const reset = () => {
        var origDat = {
            name: studioData.name,
            address: studioData.address,
            post_code: studioData.post_code,
            phone_num: studioData.phone_num,
            images: []
        }

        setError(errorsEmpty)
        errorsRef.current = errors
        setReq(false)
        setreqSucess(false)

        setFormDat(origDat)
    }

    const reset2 = (key, value) => {
        var origDat = {
            name: formDataRef.current.name,
            address: formDataRef.current.address,
            post_code: formDataRef.current.post_code,
            phone_num: formDataRef.current.phone_num,
            images: []
        }
        if (key !== 'images')
            origDat[key] = value.target.value
        else {
            for (var img of value.target.files) {
                origDat['images'].push(img)
            }
        }

        setError(errorsEmpty)
        errorsRef.current = errors
        setReq(false)
        setreqSucess(false)

        setFormDat(origDat)
    }

    function ShowGeneralMessage() {
        var flag = 0

        for (const [k, v] of Object.entries(errors)) {
            if (v) {
                flag = 1
            }
        }

        if (reqSent && flag === 1 && !reqSucess) {
            return (
                <Alert severity="error">
                    <AlertTitle>Please resolve errors</AlertTitle>
                </Alert>
            )
        }
    }


    const fieldVars = [
        'name',
        'address',
        'post_code',
        'phone_num',
        'images'
    ]

    const fieldNames = [
        'Studio Name',
        'Address',
        'Postal Code',
        'Phone Number',
        'Images'
    ]

    function form() {
        return (
            <React.Fragment>
                {fieldVars.map((fieldID, index) => {
                    var err = Boolean(errorsRef.current[fieldID].length);
                    const label = fieldNames[index]
                    var val = formDataRef.current[fieldID]

                    if (fieldID !== 'images') {
                        return (
                            <Stack spacing={0} key={fieldID}>
                                <Box>
                                    <TextField
                                        error={err}
                                        label={label}
                                        id={fieldID}
                                        value={val}
                                        onChange={e => reset2(fieldID, e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <i style={{color: 'red'}}>{errorsRef.current[fieldID]}</i>
                                </Box>
                            </Stack>
                        )
                    } else {
                        return (
                            <Stack spacing={0} key={fieldID}>
                                <Box>
                                    <input
                                        multiple
                                        type="file"
                                        name="studio_images"
                                        accept='image/png, image/jpeg'
                                        id='images'
                                        style={{display: 'none'}}
                                        onChange={e => reset2(fieldID, e)}
                                    />
                                    <label htmlFor="images">
                                        <Button variant="contained" color="primary"
                                                component="span">
                                            Studio Images
                                        </Button>
                                    </label>

                                </Box>
                                <Box>
                                    <i style={{color: 'red'}}>{errorsRef.current[fieldID]}</i>
                                </Box>
                            </Stack>
                        )
                    }
                })
                }

            </React.Fragment>
        )

    }

    function validateData() {
        let data = formData
        let hasErrors = false

        if (formData.phone_num && !(errors.phone_num.length)) {
            if (!(/^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/.test(data.phone_num))) {
                errors['phone_num'] = 'Phone Number is Invalid'
                hasErrors = true
            }
        }

        if (formData.post_code && !(errors.post_code.length)) {
            if (!(/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/.test(data.post_code))) {
                errors['post_code'] = 'Postal Code is Invalid'
                hasErrors = true
            }
        }

        setError(errors)
        errorsRef.current = errors
        return hasErrors
    }

    function submit() {
        if (validateData()) {
        } else {
            setAxiosLoading(true)

            var targetURL = url
            var formdat = new FormData()
            formdat.set("name", formData.name)
            formdat.set("address", formData.address)
            formdat.set("post_code", formData.post_code)
            formdat.set("phone_num", formData.phone_num)
            formdat.set("images", [])

            // console.log(formData.images)
            for (let i = 0; i < formData.images.length; i++) {
                formdat.append('images', formData.images[i])
            }
            // console.log(formdat)

            var token = ctx.userToken
            if (token === null) {
                return
            }
            token = token.replace("Token ", "")
            var requestData = {
                url: targetURL,
                method: "POST",
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization": "Token " + token
                },
                data: formdat
            }

            axios(requestData)
                .then(function (response) {
                    setAxiosLoading(false)
                    // Display thing saying changes saved
                    ctx.updateDataFlag()
                    setReq(true)
                    setreqSucess(true)
                    setSnackbarOpen(true)
                })
                .catch(function (error) {
                    var errDat = error.response.data
                    setError(errDat)
                    setReq(true)
                    console.log("mission failed, we get em next time")
                })
        }
    }


    const vertical = 'bottom'
    const horizontal = 'center';


    return (
        <Paper elevation={3} sx={{textAlign: 'center'}}>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                autoHideDuration={8000}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success"
                       sx={{width: '100%'}}>
                    Success!
                </Alert>
            </Snackbar>


            <Box sx={{p: 2}}>
                <Typography variant="h3">Edit Studio</Typography>
            </Box>
            {reqSent && ShowGeneralMessage()}
            <Divider/>

            <Stack spacing={4} sx={{p: 4}}>
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
