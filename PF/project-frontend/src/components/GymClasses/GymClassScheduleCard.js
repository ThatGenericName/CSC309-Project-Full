import {Card, CardActions, Stack, Typography, Box} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useContext, useState} from "react";
import {Link} from 'react-router-dom'

import {APIContext} from "../APIContextProvider";
import {EnrollUserInSession} from "./UserEnroll/EnrollUserInSessionButton";
import axios from "axios";
import {BASEURL} from "../constants";
import Grid2 from "@mui/material/Unstable_Grid2";

export function GymClassScheduleCard(props) {

    const ctx = useContext(APIContext)

    const data = props.data

    function UnCancelSchedule() {
        const id = props.data.id

        const url = BASEURL + "classes/schedule/" + id + "/uncancel/"


        let requestData
        var token = ctx.userToken
        if(token === null){
            return
        }
        token = token.replace("Token ", "")

        requestData = {
            url: url,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + token
            },

        }

        axios(requestData).then(function (response) {
            if (props.onSend !== undefined) {
                props.onSend()
            }
        }).catch(function (error) {
        })
    }

    function CancelSchedule() {
        const id = props.data.id

        const url = BASEURL + "classes/schedule/" + id + "/delete/"


        let requestData
        var token = ctx.userToken
        if(token === null){
            return
        }
        token = token.replace("Token ", "")

        requestData = {
            url: url,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + token
            },

        }

        axios(requestData).then(function (response) {
            if (props.onSend !== undefined) {
                props.onSend()
            }
        }).catch(function (error) {
        })
    }

    function DeleteSchedule() {
        const id = props.data.id

        const url = BASEURL + "classes/schedule/" + id + "/delete/"


        let requestData
        var token = ctx.userToken
        token = token.replace("Token ", "")

        requestData = {
            url: url,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + token
            },
            data: {"delete": true}

        }

        axios(requestData).then(function (response) {
            if (props.onSend !== undefined) {
                props.onSend()
            }
        }).catch(function (error) {
        })
        // window.location.reload(false);
    }


    // var subButton = ctx.userLoggedIn ? (
    //     <Button onClick={handleAmenityOpen} variant='contained'>
    //     Subscribe
    //     </Button>) : null
    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }

    function extract_date(date) {
        var start_index = date.indexOf('T') + 1
        var end_index = getPosition(date, ":", 2)
        return date.substring(start_index, end_index)
    }

    let a = 1

    return (
        <Card
            key={props.data.id}
            variant='outlined'
            sx={{p: 2}}
            style={{width: '95%'}}
        >
            <Grid2 container spacing={3}>
                <Grid2 xs={3}>
                    <Typography variant='h5'>
                        {props.data.parent_class.name}
                    </Typography>
                </Grid2>
                <Grid2 xs/>
                <Grid2 xs={2}>
                    <Typography variant='h5'>
                        {props.admin && ("ID : " + props.data.id)}
                    </Typography>
                </Grid2>
            </Grid2>

            <Grid2
                container
                alignItems='center'
                spacing={2}
            >

                <Grid2 xs={3}>
                    <Stack spacing={1}>

                        <Typography variant='h7'>
                            {"Date : " + props.data.date}
                        </Typography>
                        <Typography>
                            {"Enrollment Capacity : " + props.data.enrollment_capacity}
                        </Typography>
                        <Typography>
                            {"Enrollment Count : " + props.data.enrollment_count}
                        </Typography>
                        {props.admin && <React.Fragment>

                        </React.Fragment>}
                    </Stack>
                </Grid2>
                <Grid2 xs={3}>
                    <Stack spacing={1}>

                        <Typography>
                            {"Class Description : " + props.data.parent_class.description
                            }
                        </Typography>
                        <Typography >
                                {"IsCancelled : " + props.data.is_cancelled}
                            </Typography>
                    </Stack>
                </Grid2>

                <Grid2 xs={3}>
                    <Stack spacing={1}>
                        <Typography>
                            {
                                "Start Time : " + extract_date(props.data.start_time)
                            }
                        </Typography>
                        <Typography>
                            {"End Time : " + extract_date(props.data.end_time)}
                        </Typography>
                    </Stack>
                </Grid2>

                {props.admin && <React.Fragment>
                    <CardActions sx={{gap: 1}}>
                        <Button variant='contained' component={Link} to={{
                            pathname:
                                `${props.data.id}/edit/`
                        }}>
                            Edit
                        </Button>
                        <Button variant='contained' onClick={DeleteSchedule}>
                            Delete
                        </Button>
                        <Button variant='contained' onClick={CancelSchedule}>
                            Cancel
                        </Button>
                        <Button variant='contained' onClick={UnCancelSchedule}>
                            UnCancel
                        </Button>

                    </CardActions>
                </React.Fragment>}

                {ctx.userLoggedIn && <React.Fragment>
                    <CardActions sx={{gap: 1}}>
                        <EnrollUserInSession
                            sessionID={data.id}
                            className={data.parent_class.name}
                        />
                    </CardActions>
                </React.Fragment>}
            </Grid2>
        </Card>
    )
}
