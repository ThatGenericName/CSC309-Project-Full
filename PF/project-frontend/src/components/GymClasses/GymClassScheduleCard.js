import {
    Box,
    Card,
    CardActions, DialogContent,
    DialogTitle,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, {useContext, useState} from "react";
import {Link, Route, Routes} from 'react-router-dom'

import {APIContext} from "../APIContextProvider";
import {EnrollUserInSession} from "./UserEnroll/EnrollUserInSessionButton";
import Subscription from "../subscriptions/Subscription";
import axios from "axios";
import {BASEURL} from "../constants";
import Grid2 from "@mui/material/Unstable_Grid2";

import FormData from "form-data";
import {SubscriptionPayment} from "../subscriptions/SubscriptionPayment";

export function GymClassScheduleCard(props){

    const ctx = useContext(APIContext)

    const data = props.data

    const [open, setOpen] = useState(false)
    const [openSub, setOpenSub] = useState(false)
    // const []

    function handleClose(){
        setOpen(false)
    }

    function handleOpen(){
        setOpen(true)
    }

    function handleAmenityOpen(){
        setOpenSub(true)
    }

    function handleSubscriptionClose(){
        setOpenSub(false)
    }

    function CancelSchedule(){
        const id = props.data.id

        const url = BASEURL + "classes/schedule/" + id + "/delete/"


        let requestData

        requestData = {
            url: url,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },

        }

        axios(requestData).then(function (response) {}).catch(function (error) {})
    }

    function DeleteSchedule(){
        const id = props.data.id

        const url = BASEURL + "classes/schedule/" + id + "/delete/"


        let requestData

        requestData = {
            url: url,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {"delete": true}

        }

        axios(requestData).then(function (response) {}).catch(function (error) {})
        window.location.reload(false);
    }


    // var subButton = ctx.userLoggedIn ? (
    //     <Button onClick={handleAmenityOpen} variant='contained'>
    //     Subscribe
    //     </Button>) : null
    function getPosition(string, subString, index) {
      return string.split(subString, index).join(subString).length;
    }
    function extract_date(date){
        var start_index = date.indexOf('T') + 1
        var end_index = getPosition(date, ":", 2)
        return date.substring(start_index, end_index)
    }

return (
        <Card
            key={props.data.id}
            variant='outlined'
            sx={{p:2}}
            style={{width:'90%'}}
        >
            <Grid2
                container
                alignItems='center'
                spacing={3}
            >
                <Grid2 xs={3}>
                    <Stack spacing={1}>
                        <Typography variant='h5'>
                            {"Date : " + props.data.date}
                        </Typography>
                        <Typography >
                            {"Enrollment Capacity : " + props.data.enrollment_capacity}
                        </Typography>
                        <Typography >
                            {"Enrollment Count : " + props.data.enrollment_count}
                        </Typography>
                    </Stack>
                </Grid2>

                <Grid2 xs={3}>
                    <Stack spacing={1}>
                        <Typography>
                        {
                            "Start Time : " +extract_date(props.data.start_time)
                        }
                        </Typography>
                        <Typography >
                            {"End Time : " +extract_date(props.data.end_time)}
                        </Typography>
                    </Stack>
                </Grid2>


                <Grid2 xs={6} >
                    <Button variant='contained' component={Link} to={{pathname:
                            `/schedule/${props.data.id}/edit/`}}>
                        Edit
                    </Button>
                    <Button variant='contained' onClick={DeleteSchedule}>
                        Delete
                    </Button>
                        <Button variant='contained' onClick={CancelSchedule}>
                            Cancel
                        </Button>
                </Grid2>
            </Grid2>
        </Card>
    )
}
