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
import UserLanding from "../user/UserLanding";
import Subscription from "../subscriptions/Subscription";
import axios from "axios";
import {BASEURL} from "../constants";
import Grid2 from "@mui/material/Unstable_Grid2";

export function StudioCard(props){

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
    }


    // var subButton = ctx.userLoggedIn ? (
    //     <Button onClick={handleAmenityOpen} variant='contained'>
    //     Subscribe
    //     </Button>) : null

    return (
        <Card
            key={props.key}
            variant='outlined'
            sx={{p:2}}
            style={{width:'50%'}}
        >
            <Grid2
                container
                columns={24}
                rowSpacing={1}
                columnSpacing={1}
                alignItems="center"
                justifyContent='center'
            >
                {/*<Grid2 xs={5}>*/}
                {/*    <Box sx={{ fontWeight: 'bold', fontSize: 20}}>*/}
                {/*        {props.data.name}*/}
                {/*    </Box>*/}
                {/*</Grid2>*/}

                {/*<Grid2 xs={3}  >*/}
                {/*    {props.data.address}*/}
                {/*</Grid2>*/}

                {/*<Grid2 xs={3}>*/}
                {/*    {props.data.post_code}*/}
                {/*</Grid2>*/}

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

                {/*<Stack spacing={2} sx={{m: 1}} >*/}
                {/*    <Typography variant='h7'>*/}
                {/*        {props.data.name}*/}
                {/*    </Typography>*/}
                {/*    <Typography variant='h7'>*/}
                {/*        {props.data.address}*/}
                {/*    </Typography>*/}
                {/*</Stack>*/}
                {/*<br/>*/}
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

                </CardActions>
            </Grid2>

        </Card>

    )
}
