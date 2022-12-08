import {Box, Chip, Paper, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import React, {useContext} from "react";
import Button from "@mui/material/Button";
import axios from "axios";

import {BASEURL, BASEURLNOEND} from "../../constants";
import {APIContext} from "../../APIContextProvider";


export function UserDetailsCard(props) {
    const data = props.data
    const ctx = useContext(APIContext)

    function UserIcon() {
        let icon
        if (data['profile_pic'] === null || data['profile_pic'] === "") {
            icon = <AccountCircleIcon
                sx={{width: 64, height: 64}}
            />
        } else {
            const src = BASEURLNOEND + data['profile_pic']
            icon = <Avatar
                alt={data['profile_pic']}
                src={src}
                sx={{width: 64, height: 64}}
            />
        }

        return (
            <Box
                style={{justifyContent: "center", display: "flex"}}
            >
                {icon}
            </Box>
        )
    }

    function sendRequest(setCoach) {
        const subUrl = setCoach ? 'setcoach/' : 'setadmin/'
        const targetURL = BASEURL + "accounts/" + subUrl + data['id'] + '/'
        if (ctx.userToken === null) {
            return
        }
        const token = "Token " + ctx.userToken.replace("Token ")

        var targetMethod
        if (setCoach) {
            targetMethod = data['is_coach'] ? 'DELETE' : 'GET'
        } else {
            targetMethod = data['is_staff'] ? 'DELETE' : 'GET'
        }

        const reqDat = {
            url: targetURL,
            method: targetMethod,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            }
        }

        axios(reqDat).then(function (response) {
            if (props.onSend !== undefined) {
                props.onSend()
            }
        }).catch(function (error) {
            let a = 1
        })
    }

    return (
        <Box
            style={{
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'center',
                justifyItems: 'center',
                width: "100%",
            }}
        >
            <Paper sx={{p: 2}}>
                <Grid2 container spacing={1}>
                    <Grid2 xs={3}>
                        <Stack spacing={2}>
                            {UserIcon()}
                            <Typography>
                                Username: {data['username']}
                            </Typography>
                            <Typography>
                                {data['last_name']}, {data['first_name']}
                            </Typography>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={4}>
                        <Stack spacing={2}>
                            <Typography>
                                Email: <Chip label={data['email']}/>
                            </Typography>
                            {data['is_staff'] && <Chip label='ADMIN'/>}
                            {data['is_coach'] && <Chip label='COACH'/>}
                        </Stack>
                    </Grid2>
                    <Grid2 xs={1}/>
                    <Grid2 xs={3}>
                        <Stack spacing={2}>
                            <Chip label={"ID: " + data['id']}/>
                            <Button
                                variant='outlined'
                                onClick={() => sendRequest(false)}
                            >
                                {data['is_staff'] ? "Revoke Admin" : "Make Admin"}
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={() => sendRequest(true)}
                            >
                                {data['is_coach'] ? "Revoke Coach" : "Make Coach"}
                            </Button>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={1}/>
                </Grid2>
            </Paper>
        </Box>
    )
}
