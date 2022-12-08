import {LinearProgress, Paper, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {APIContext} from "../../APIContextProvider";
import {BASEURL} from "../../constants";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {AccountPaymentPreview} from "./AccountPaymentPreview";
import {AddPaymentMethod} from "./AddPaymentMethod";
import {RemovePaymentMethod} from "./RemovePaymentMethod";


export function AccountPaymentDashboard(props) {
    const ctx = useContext(APIContext)

    const [componentState, setComponentState] = useState({
        axiosLoading: true,
        activePayment: null,
        hasPaymentInfo: false,
        responseReceived: false
    })

    function getComponentState() {
        // apparently state change is by detecting if the reference changes.
        // weird.
        const newObj = {}
        Object.keys(componentState).forEach(k => newObj[k] = componentState[k])
        return newObj
    }

    const [updateDash, setUpdateDash] = useState(false)

    const [dialogState, setDialogState] = useState(false)


    function getPaymentInfo() {
        const targetURL = BASEURL + 'accounts/payment/'

        const token = ctx.userToken.replace("Token ")

        let requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Token " + token
            }
        }

        axios(requestData).then(function (response) {
            var data = getComponentState()
            data.activePayment = response.data
            data.hasPaymentInfo = true
            data.axiosLoading = false
            data.responseReceived = true
            setComponentState(data)
        }).catch(function (error) {
            if (error.response.status === 404) {
                var data = getComponentState()
                data.activePayment = null
                data.hasPaymentInfo = false
                data.axiosLoading = false
                data.responseReceived = true
                setComponentState(data)
            }
        })
    }

    function forceUpdateDash() {
        setUpdateDash(true)
    }

    function handleClose() {
        setDialogState(false)
    }

    function handleOpen() {
        setDialogState(true)
    }

    if (updateDash) {
        setUpdateDash(false)
        let state = getComponentState()
        state.responseReceived = false
        state.payment_detail = null
        state.axiosLoading = true
        setComponentState(state)
    }

    if (!componentState.responseReceived) {
        getPaymentInfo()
    }

    if (componentState.axiosLoading) {
        return (
            <Paper sx={{p: 3}}>
                <LinearProgress/>
            </Paper>
        )
    }

    return (
        <Paper sx={{p: 3}}>
            <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                    <Button component={Link} to={'/account/payment'} sx={{color: 'black'}}>
                        <Typography variant='h4'>
                            Active Payment Method
                        </Typography>
                    </Button>
                </Grid2>
                <Grid2 xs={2}/>
                <Grid2 xs={4}>
                    <Button variant='outlined' onClick={handleOpen}>
                        Add Payment Method
                    </Button>
                    <AddPaymentMethod open={dialogState} onClose={handleClose}
                                      onSend={forceUpdateDash}/>
                    {componentState.activePayment !== null &&
                        <RemovePaymentMethod data={componentState.activePayment}
                                             onSend={forceUpdateDash}/>}
                </Grid2>
                <Grid2 xs={12}>
                    <AccountPaymentPreview data={componentState.activePayment}/>
                </Grid2>
            </Grid2>
        </Paper>
    )
}
