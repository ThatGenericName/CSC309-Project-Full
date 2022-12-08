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
            <Grid2
                container
                alignItems='center'
                spacing={3}
            >
                <Grid2 xs={3}>
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

                <Grid2 xs={3}>
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
                        <Typography>
                            {"Start Time : " + props.data.start_time}
                        </Typography>
                        <Typography>
                            {"End Time : " + props.data.end_time}
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
                        <Button variant='contained' onClick={DeleteClass}>
                            Delete
                        </Button>
                        <Button variant='contained' onClick={CancelClass}>
                            Cancel
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
