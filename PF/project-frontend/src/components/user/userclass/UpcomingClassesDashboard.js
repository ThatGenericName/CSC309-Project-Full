import {APIContext} from "../../APIContextProvider";
import React, {useContext, useState} from "react";
import {Box, Paper, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import ClassCard from "./ClassCard";
import {BASEURL} from "../../constants";
import axios from "axios";

export function UpcomingClassesDashboard(props) {
    const ctx = useContext(APIContext)

    const [compState, setCompState] = useState({
        axiosLoading: true,
        itemsList: null
    })

    function getData() {

        var targetURL = BASEURL + 'accounts/enrolledclasses/'

        var par = {
            page: 1,
            sort: 'asc',
            filter: 'future',
            dropped: 'false'
        }

        var token = ctx.userToken
        token = token.replace("Token ")

        var requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            },
            params: par
        }

        axios(requestData)
            .then(function (response) {
                setCompState({
                    axiosLoading: false,
                    itemsList: response.data['results'],
                })
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    setCompState({
                        axiosLoading: false,
                        itemsList: []
                    })
                } else {
                    setCompState({
                        axiosLoading: false,
                        itemsList: null
                    })
                }
            })
    }


    function generateList(ListData) {
        var ct = 4
        var list = ListData.slice(0, ct)

        return (
            <Box
                sx={{width: "100%", p: 2}}
                style={{overflow: 'auto'}}
                textAlign='center'
            >
                <Stack
                    spacing={2}
                    direction='row'
                    justifyContent="center"
                >
                    {list.map(item => {
                        return <ClassCard classData={item}/>
                    })}
                </Stack>
            </Box>
        )
    }

    if (compState.itemsList == null) {
        getData()
    } else {
        return (
            <Paper sx={{p: 3}}>
                <Grid2
                    container
                    spacing={2}
                >
                    <Grid2 xs={6}>
                        <Button component={Link} to={'/account/classes'} sx={{color: 'black'}}>
                            <Typography variant='h4'>
                                Upcoming Classes
                            </Typography>
                        </Button>
                    </Grid2>
                    <Grid2 xs={2}/>
                    <Grid2 xs={4}>
                        <Button variant='outlined' onClick={() => {
                        }}>
                            Drop Future Classes
                        </Button>
                        <Dialog open={false} onClose={() => {
                        }}>
                            <Box sx={{p: 3}}>
                                Are you sure you want to drop all future classes?
                            </Box>
                            <DialogActions>
                                <Button onClick={() => {
                                }}>Cancel</Button>
                                <Button onClick={() => {
                                }}>Confirm</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid2>
                    <Grid2 xs={12}>
                        {generateList(compState.itemsList)}
                    </Grid2>
                </Grid2>
            </Paper>
        )
    }


}
