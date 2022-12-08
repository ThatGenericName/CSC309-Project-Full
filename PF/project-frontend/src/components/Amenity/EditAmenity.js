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

import * as Constants from "../constants"
import {useParams} from "react-router-dom";


export default function EditAmenity(props){

    let ctx = useContext(APIContext)

    const { id, id_2 } = useParams()

    const url = Constants.BASEURL + "studios/" + id_2  + "/amenities/edit/"

    let amenityData = {
        type: "",
        quantity: ""
    }

    const [formData, setFormDat] = useState({
        type: amenityData.type,
        quantity: amenityData.quantity
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
        type: "",
        quantity: "",
        error: ""
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
            type: amenityData.type,
            quantity: amenityData.quantity
        }
        setError(errorsEmpty)
        errorsRef.current = errors
        setReq(false)
        setreqSucess(false)

        setFormDat(origDat)
    }

    const reset2 = (key, value) => {
        var origDat = {
            type: formDataRef.current.type,
            quantity: formDataRef.current.quantity
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
        'type',
        'quantity'
    ]

    const fieldNames = [
        'Amenity Type',
        'Quantity'
    ]

    function form(){
        return (
            <React.Fragment>
                <Box>
                    <i style={{ color: 'red'}}>{errorsRef.current["error"]}</i>
                </Box>
                {fieldVars.map((fieldID, index) => {
                    var err = Boolean(errorsRef.current[fieldID].length);
                    const label = fieldNames[index]
                    var val = formDataRef.current[fieldID]

                    if(fieldID === 'type'){
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
                                <TextField
                                    type='number'
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
                    })
                }

            </React.Fragment>
            )

    }

    function submit() {
        setAxiosLoading(true)

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
                setReq(true)
                setreqSucess(true)
                setSnackbarOpen(true)
            })
            .catch(function (error) {
                var errDat = error.response.data
                setError(errDat)
                console.log("mission failed, we get em next time")
            })
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
                <Typography variant="h3">Edit Amenity</Typography>
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
