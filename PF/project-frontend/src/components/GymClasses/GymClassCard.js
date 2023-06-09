import {Card, CardActions, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useContext} from "react";
import {Link} from 'react-router-dom'

import {APIContext} from "../APIContextProvider";
import {EnrollUserInClassButton} from "./UserEnroll/EnrollUserInClassButton";
import axios from "axios";
import {BASEURL} from "../constants";
import Grid2 from "@mui/material/Unstable_Grid2";

export function GymClassCard(props) {

    const ctx = useContext(APIContext)

    const data = props.data

    function UnCancelClass() {
        const id = props.data.id

        const url = BASEURL + "classes/gymclass/" + id + "/uncancel/"


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

    function CancelClass() {
        const id = props.data.id

        const url = BASEURL + "classes/" + id + "/delete/"


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

        }

        axios(requestData).then(function (response) {
            if (props.onSend !== undefined) {
                props.onSend()
            }
        }).catch(function (error) {
        })
    }

    function DeleteClass() {
        const id = props.data.id

        const url = BASEURL + "classes/" + id + "/delete/"


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

    let a = 1

    return (

        <Card
            key={props.data.id}
            variant='outlined'
            sx={{p: 2}}
            style={{width: '90%'}}
        >
            <Grid2 container spacing={3}>
                <Grid2 xs/>
                <Grid2 xs={2}>
                    <Typography>
                        {props.admin && ("ID : " + props.data.id)}
                    </Typography>
                </Grid2>
            </Grid2>
            <Grid2
                container
                alignItems='center'
                spacing={3}
            >
                <Grid2 xs={4}>
                    <Stack spacing={1}>
                        <Typography variant='h5'>
                            {"Name : " + props.data.name}
                        </Typography>
                        <Typography>
                            {"Description : " + props.data.description}
                        </Typography>
                        <Typography>
                            {"keywords : " + props.data.keywords}
                        </Typography>
                    </Stack>
                </Grid2>

                <Grid2 xs={4}>
                    <Stack spacing={1}>
                        <Typography>
                            {
                                "Start Date : " + props.data.earliest_date
                            }
                        </Typography>
                        <Typography>
                            {"End Date : " + props.data.last_date}
                        </Typography>
                        <Typography>
                            {"Day : " + props.data.day}
                        </Typography>

                    </Stack>
                </Grid2>
                <Grid2 xs={4}>
                    <Stack spacing={1}>

                        <Typography>
                            {"Start Time : " + props.data.start_time}
                        </Typography>
                        <Typography>
                            {"End Time : " + props.data.end_time}
                        </Typography>
                        {props.admin && <React.Fragment>
                            <Typography >
                                {"IsCancelled : " + props.data.is_cancelled}
                            </Typography>
                        </React.Fragment>}
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
                        <Button variant='contained' onClick={DeleteClass}>
                            Delete
                        </Button>
                        <Button variant='contained' onClick={CancelClass}>
                            Cancel
                        </Button>
                        <Button variant='contained' onClick={UnCancelClass}>
                            UnCancel
                        </Button>

                    </CardActions>
                </React.Fragment>}
                {ctx.userLoggedIn && <React.Fragment>
                    <CardActions sx={{gap: 1}}>
                        <EnrollUserInClassButton
                            classID={data.id}
                            className={data.name}
                        />
                    </CardActions>
                </React.Fragment>}

            </Grid2>
        </Card>
    )
}
