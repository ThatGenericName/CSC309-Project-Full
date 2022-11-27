import React from 'react';
import InitElements from "../InitElements";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {APIContext} from "../APIContextProvider";
import {Box, Divider, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default class DashboardMenu extends React.Component{
    static contextType = APIContext
    constructor(props, context) {
        super(props, context);
        let a = 1
    }

    GetUserData(){
        // for some reason, context isn't being passed to here and so I need
        // to collect the data again.
    }

    UserIconGrid(){
        let userData = this.props.userData
        let displayName;
        let displayUsername;
        if (userData.first_name === null && userData.last_name === null){
            displayName = userData.username
            displayUsername = ""
        }
        else if (userData.first_name === null){
            displayName = userData.last_name
            displayUsername = userData.username
        }
        else{
            displayName = userData.first_name + " " + userData.last_name
            displayUsername = userData.username
        }

        let icon
        if (userData.profile_pic === null || userData.profile_pic === "") {
            icon = <AccountCircleIcon
                sx={{ width: 56, height: 56 }}
            />
        }
        else{
            icon = <Avatar
                alt={displayName}
                src={this.state.imgSrc}
                sx={{ width: 56, height: 56 }}
            />
        }

        return (
            <Grid2 p={2} container spacing={2}>
                <Grid2 xs={3}>
                    {icon}
                </Grid2>
                <Grid2 xs={9}>
                    <Box sx={{ fontWeight: 'bold'}}>
                        {displayName}
                    </Box>
                    <Box>
                        {displayUsername}
                    </Box>
                    <Box>
                        {userData.is_staff ? "Staff" : ""}
                    </Box>
                </Grid2>
            </Grid2>
        )
    }


    Navigation(){


        return (
            <Stack spacing={3}>
                <Button variant="text">Edit Profile</Button>
                <Button variant="text">Subscriptions</Button>
                <Button variant="text">Classes</Button>
            </Stack>
        )
    }

    openedMenu(){
        return (
            <div>
                Opened Menu
                {this.UserIconGrid()}
                <Divider/>
                {this.Navigation()}
            </div>
        )
    }

    closedMenu(){
        return (
            <box
                sx={{
                    flexGrow: 1 ,
                    borderRadius: 1,
                    m:2,
                    textAlign: 'center'
                }}
            >
                Closed menu

            </box>
        )
    }

    render(){
        return (
            <Paper
                elevation={3}
                sx={{textAlign:'center'}}
            >
                {this.props.menuOpened ? this.openedMenu() : this.closedMenu()}
            </Paper>
        )
    }
}
