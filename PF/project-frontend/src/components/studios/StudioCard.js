import {Box, CardActions, Stack, Typography} from "@mui/material";

import Button from "@mui/material/Button";
import React, {useContext, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'

import {APIContext} from "../APIContextProvider";
import axios from "axios";
import {BASEURL} from "../constants";
import Grid2 from "@mui/material/Unstable_Grid2";


export function StudioCard(props) {

    const ctx = useContext(APIContext)

    const data = props.data

    const [change, setChange] = useState(false)
    const [arg, setArg] = useState({studioData: props.data})


    const navigate = useNavigate();
    const reload = () => {
        navigate.go(0);
    }


    function DeleteStudio() {
        const id = props.data.id

        const url = BASEURL + "studios/" + id + "/delete/"

        var token = ctx.userToken
        if (token === null) {
            return
        }
        token = token.replace("Token ", "")


        let requestData = {
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
            let a = 1
        })


    }


    return (
        <Card
            key={props.data.id}
            variant='outlined'
            sx={{p: 2}}
            style={{width: '80%'}}
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
                    {props.admin && <React.Fragment>
                        {/*{ <React.Fragment>*/}
                        <Box>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `${props.data.id}/edit/`
                            }}>
                                Edit
                            </Button>
                        </Box>
                        <Box>
                            <Button variant='contained' onClick={DeleteStudio}>
                                Delete
                            </Button>
                        </Box>
                    </React.Fragment>
                    }
                    {props.admin && <React.Fragment>
                        <Box>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `/admin/studio/${props.data.id}/amenities/`
                            }}>
                                Amenities
                            </Button>
                        </Box>
                    </React.Fragment>
                    }
                    {!props.admin && <React.Fragment>
                        <Box>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `/studio/${props.data.id}/amenities/`
                            }}>
                                Amenities
                            </Button>
                        </Box>
                    </React.Fragment>
                    }


                    {!props.admin && <React.Fragment>
                        <Box>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `/studio/${props.data.id}/gymclasses/`
                            }}>
                                Gym Class
                            </Button>
                        </Box>
                    </React.Fragment>
                    }
                    {props.admin && <React.Fragment>
                        <Box>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `/admin/studio/${props.data.id}/gymclasses/`
                            }}>
                                Gym Class
                            </Button>
                        </Box>
                    </React.Fragment>
                    }
                    {props.admin && <React.Fragment>
                        <Box>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `/admin/studio/${props.data.id}/schedules/`
                            }}>
                                Schedules
                            </Button>
                        </Box>
                    </React.Fragment>
                    }
                    {!props.admin && <React.Fragment>
                        <Box>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `/studio/${props.data.id}/schedules/`
                            }}>
                                Schedules
                            </Button>
                        </Box>
                    </React.Fragment>
                    }

                    <Box>
                        <Button variant='contained' component={Link} to={{
                            pathname:
                                `/studios/${props.data.id}/view/`
                        }}>
                            View
                        </Button>
                    </Box>

                </CardActions>
            </Grid2>

        </Card>

    )
}
