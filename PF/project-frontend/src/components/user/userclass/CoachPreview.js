import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import {Box, Card, Stack} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";


export default function CoachPreview(props) {
    let coachData = props.coachData

    let cn = coachData['first_name'] + " " + coachData['last_name']
    let cmail = coachData['email']

    let icon
    if (coachData.profile_pic === null || coachData.profile_pic === "") {
        icon = <AccountCircleIcon
            sx={{width: 48, height: 48}}
        />
    } else {
        icon = <Avatar
            alt={coachData.username}
            src={coachData.profile_pic}
            sx={{width: 48, height: 48}}
        />
    }

    return (
        <Card
            style={{height: '5em'}}
            variant="outlined"
            sx={{p: 1}}
            component={Stack}
            direction="column"
            justifyContent="center"
        >
            <Grid2 container spacing={0}>
                <Grid2 xs={3}>
                    {icon}
                </Grid2>
                <Grid2 xs={8}>
                    <Box sx={{fontWeight: 'bold'}}>
                        {cn}
                    </Box>
                    <Box>
                        {cmail}
                    </Box>
                </Grid2>
            </Grid2>
        </Card>
    )
}
