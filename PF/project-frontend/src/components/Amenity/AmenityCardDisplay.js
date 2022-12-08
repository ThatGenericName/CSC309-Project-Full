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
import EditAmenity from "./EditAmenity"

import {APIContext} from "../APIContextProvider";
import UserLanding from "../user/UserLanding";
import Subscription from "../subscriptions/Subscription";
import Amenity from "./Amenity";
import axios from "axios";
import {BASEURL} from "../constants";
import Grid2 from "@mui/material/Unstable_Grid2";

export function AmenityCardDisplay(props){

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

    function DeleteAmenity(){
        const id = props.data.id

        const url = BASEURL + "studios/" + id + "/amenities/delete/"

        let requestData = {
                    url: url,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }

        axios(requestData).then(function (response) {
            if (props.onSend !== undefined){
                props.onSend()
            }}
        ).catch(function (error) {})
    }


    var subButton = ctx.userLoggedIn ? (
        <Button onClick={handleAmenityOpen} variant='contained'>
        Subscribe
        </Button>) : null

    return (
        <Card
            key={props.key}
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
                <Grid2 xs={12}>
                    <Stack spacing={1}>
                        <Typography>
                            {"Amenity Type : " + props.data.type}
                        </Typography>
                        <Typography>
                            {"Quantity : "+ props.data.quantity}
                        </Typography>
                    </Stack>
                </Grid2>

                <CardActions>
                    <Box>
                        <Button variant='contained' component={Link} to={{pathname:
                        `${props.data.id}/edit/`}}>
                          Edit
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' onClick={DeleteAmenity}>
                          Delete
                        </Button>
                    </Box>

                </CardActions>
            </Grid2>
        </Card>

    )
}
