import {Card, ImageList, ImageListItem, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, {useContext, useState} from "react";
import {BASEURL, BASEURLNOEND} from "../constants";
import axios from "axios";
import {useParams} from "react-router-dom";

import Button from "@mui/material/Button";
import {APIContext} from "../APIContextProvider";

export default function StudioPreview(props) {

    const [formData, setFormDat] = useState({
        data: null,
        images: [],
        request_complete: false
    })

    const {id} = useParams()

    const ctx = useContext(APIContext)

    const getdata = (props) => {
        const url = BASEURL + "studios/" + id + "/"


        var token = ctx.userToken

        if (token === null) {
            return
        }

        token = token.replace("Token ", "")

        if (!formData.request_complete) {
            let requestData = {
                url: url,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + token
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
    }

    if (!formData.request_complete)
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

                        <a href={formData.data.direction} style={{textDecoration: 'none'}}>
                            <Button variant="outlined">Click here for Directions</Button>
                        </a>

                    </Stack>
                </Grid2>


                <ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>
                    {formData.data.images.map((file, index) => {
                        let link = BASEURLNOEND + file
                        return (
                            <ImageListItem key={file}>
                                <img
                                    src={`${link}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                    loading="lazy"
                                />
                            </ImageListItem>
                        )
                    })}
                </ImageList>

            </Card>
        )
    }
}
