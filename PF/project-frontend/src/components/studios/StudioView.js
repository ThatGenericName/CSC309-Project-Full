import {Box, Card, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, {useState} from "react";
import {BASEURL} from "../constants";
import axios from "axios";
import {useParams} from "react-router-dom";

import {Link, Route, useNavigate} from 'react-router-dom'

import Button from "@mui/material/Button";

export default function StudioPreview(props) {

    const [formData, setFormDat] = useState({
        data: null,
        request_complete: false,
        request_complete_2: false
    })

    const {id} = useParams()

    const getdata = (props) => {
        const url = BASEURL + "studios/" + id + "/"

        if (!formData.request_complete) {
            let requestData = {
                url: url,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }

            axios(requestData).then(function (response) {
                setFormDat({
                    data: response.data,
                    request_complete: true
                })
            }).catch(function (error) {
            })
        }
        if (!formData.request_complete_2) {
            let requestData = {
                url: url,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }

            axios(requestData).then(function (response) {
                setFormDat({
                    data: response.data,
                    request_complete_2: true
                })
            }).catch(function (error) {
            })
        }
    }

    if (!formData.request_complete || !formData.request_complete_2)
        getdata(props)


    if (formData.request_complete) {
        return (
            <Card
                // style={{height: '80em'}}
                variant="outlined"
                sx={{p: 1}}

                component={Stack}
                direction="column"
                // justifyContent="center"
            >
                <br/>

                <Grid2 xs={10}>
                    <Stack spacing={3}>
                        <Typography variant='h5'>
                            {"Name : " + formData.data.name}
                        </Typography>
                        <Typography>
                            {"Address : " + formData.data.address}
                        </Typography>
                        <Typography>
                            {"Postal Code : " + formData.data.post_code}
                        </Typography>
                        <Typography>
                            {"Phone Number : " + formData.data.phone_num}
                        </Typography>
                        <Typography>
                            {"Postal Code : " + formData.data.post_code}
                        </Typography>

                        <a href={formData.data.direction}>
                            <Button variant="contained">Click here for Directions</Button>
                        </a>

                    </Stack>
                </Grid2>

                {/*<React.Fragment>*/}
                    {formData.data.images.map((file, index) => {
                        var file_src = "CSC309-PF/PF/BackendFiles" + file
                        var img = require(file_src)
                        return (
                            <div>
                                <img src={img}  height={200} width={200}/>

                            </div>
                        )


                        }
                    )
                    }
                    {/*<React.Fragment>*/}

            </Card>
        )
    }
}
