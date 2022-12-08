import {Box, LinearProgress, Paper, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {APIContext} from "../../APIContextProvider";
import {AccountSubscriptionPreview} from "./AccountSubscriptionPreview";
import {BASEURL} from "../../constants";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Link} from "react-router-dom";


export function ActiveSubscriptionDashboard(props) {
    const ctx = useContext(APIContext)

    const [componentState, setComponentState] = useState({
        axiosLoading: true,
        activeSubscription: null
    })

    const [dialogState, setDialogState] = useState(false)

    const actSub = ctx.userData.fullUserData['active_subscription']
    if (actSub === null) {
        return (
            <Paper sx={{p: 3, textAlign: 'center'}}>
                <Typography variant="h4">
                    You do not have any active subscriptions
                </Typography>
            </Paper>
        )
    } else if (componentState.activeSubscription === null) {
        var activeSubID = actSub['id']

        var targetURL = BASEURL + 'accounts/subscriptions/' + activeSubID + '/'

        var token = ctx.userToken
        token = token.replace("Token ")

        var requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            }
        }

        axios(requestData)
            .then(function (response) {
                setComponentState({
                    axiosLoading: false,
                    activeSubscription: response.data,
                })
            })
            .catch(function (error) {
                if (error.response.status === 404) {

                }
            })
    }

    if (componentState.axiosLoading) {
        return (
            <Paper sx={{p: 3}}>
                <LinearProgress/>
            </Paper>
        )
    }

    function send() {
        var targetURL = BASEURL + 'accounts/subscriptions/cancel/'

        var token = ctx.userToken
        token = token.replace("Token ")

        var requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            }
        }
        axios(requestData)
            .then(function (response) {
                setComponentState({
                    axiosLoading: false,
                    activeSubscription: componentState.activeSubscription,
                })
                props.filterSetter({makeRequest: true})
                handleClose()
            })
            .catch(function (error) {
                console.log('Something went wrong')
            })
    }

    function handleClose() {
        setDialogState(false)
    }

    function handleOpen() {
        setDialogState(true)
    }

    return (
        <Paper sx={{p: 3}}>
            <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                    <Button component={Link} to={'/account/subscriptions'} sx={{color: 'black'}}>
                        <Typography variant='h4'>
                            Active Subscription
                        </Typography>
                    </Button>
                </Grid2>
                <Grid2 xs={2}/>
                <Grid2 xs={4}>
                    <Button variant='outlined' onClick={handleOpen}>
                        Cancel Future Subscriptions
                    </Button>
                    <Dialog open={dialogState} onClose={handleClose}>
                        <Box sx={{p: 3}}>
                            Are you sure you want to cancel all future subscriptions?
                        </Box>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={send}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </Grid2>
                <Grid2 xs={12}>
                    <AccountSubscriptionPreview
                        subData={componentState.activeSubscription}
                        filterSetter={props.filterSetter}
                    />
                </Grid2>
            </Grid2>
        </Paper>
    )
}
