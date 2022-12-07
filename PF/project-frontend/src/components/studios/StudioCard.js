import {
    Box,
    Card,
    CardActions, DialogContent,
    DialogTitle,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import {StudioPreview} from "./StudioPreview"

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, {useContext, useState} from "react";
import {Link, Route, useNavigate} from 'react-router-dom'

import {APIContext} from "../APIContextProvider";
import UserLanding from "../user/UserLanding";
import Subscription from "../subscriptions/Subscription";
import axios from "axios";
import {BASEURL} from "../constants";
import Grid2 from "@mui/material/Unstable_Grid2";


export function StudioCard(props){

    const ctx = useContext(APIContext)

    const data = props.data

    const [change, setChange] = useState(false)
    const [arg, setArg] = useState({studioData: props.data})


    const navigate = useNavigate();
      const reload = () => {
        navigate.go(0);
      }


    function DeleteStudio(){
        const id = props.data.id

        const url = BASEURL + "studios/" + id + "/delete/"

        let requestData = {
                    url: url,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }

        axios(requestData).then(function (response) {}).catch(function (error) {})
        window.location.reload(false);
        // reload()
    }


    return (
        <Card
            key={props.data.id}
            variant='outlined'
            sx={{p:2}}
            style={{width:'60%'}}
        >
            <Grid2
                container
                columns={24}
                rowSpacing={1}
                columnSpacing={1}
                alignItems="center"
                justifyContent='center'
            >

                <Grid2 xs={8}>
                    <Stack spacing={1}>
                        <Typography variant='h5'>
                            {props.data.name}
                        </Typography>
                        <Typography>
                            {props.data.address}
                        </Typography>
                        <Typography>
                            {props.data.post_code}
                        </Typography>
                    </Stack>
                </Grid2>
                <CardActions>
                    <Box>
                        <Button variant='contained' component={Link} to={{pathname:
                            `/studios/${props.data.id}/edit/`}}>
                          Edit
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' onClick={DeleteStudio}>
                          Delete
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' component={Link} to={{pathname:
                            `/studios/${props.data.id}/amenities/`}}>
                          Amenities
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' component={Link} to={{pathname:
                            `/studios/${props.data.id}/gymclasses/`}}>
                          Gym Class
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' component={Link} to={{pathname:
                            `/studios/${props.data.id}/schedules/`}}>
                          Schedules
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' component={Link} to={{pathname:
                            `/studios/${props.data.id}/view/`}}>
                          View
                        </Button>
                    </Box>

                </CardActions>
            </Grid2>

        </Card>

    )
}
