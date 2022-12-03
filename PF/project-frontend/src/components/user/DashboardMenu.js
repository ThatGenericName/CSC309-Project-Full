import React from 'react';
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {APIContext} from "../APIContextProvider";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton, ListItemIcon, ListItemText,
    Stack,
    Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import {Link} from "react-router-dom"

import {BASEURLNOEND} from "../constants";


export default class DashboardMenu extends React.Component{
    static contextType = APIContext
    constructor(props, context) {
        super(props, context);
    }

    UserIconClosed(){
        let userData = this.props.userData
        let icon
        if (userData.profile_pic === null || userData.profile_pic === "") {
            icon = <AccountCircleIcon
                sx={{ width: 48, height: 48 }}
            />
        }
        else{
            var src = BASEURLNOEND + userData.profile_pic
            icon = <Avatar
                alt={userData.username}
                src={src}
                sx={{ width: 48, height: 48 }}
            />
        }

        return (
            icon
        )
    }

    UserIconText(){
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

        return (
            <Box>
                <Box sx={{ fontWeight: 'bold'}}>
                    {displayName}
                </Box>
                <Box>
                    {displayUsername}
                </Box>
                <Box>
                    {userData.is_staff ? "Staff" : ""}
                </Box>
            </Box>
        )
    }

    render(){
        let a = 0
        return (
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{m: -1}}>
                            {this.UserIconClosed()}
                        </ListItemIcon>
                        <ListItemText sx={{m: 2}}>
                            {this.UserIconText()}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                {/*Todo: Replace this with a loop*/}
                <ListItem
                    disablePadding
                    sx={{
                        display: 'block',

                    }}
                >
                    <ListItemButton component={Link} to={'/account'}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        Dashboard
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton component={Link} to={'/account/edit'}>
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>
                        Edit Profile
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton component={Link} to={'/account/classes'}>
                        <ListItemIcon>
                            <CalendarMonthIcon/>
                        </ListItemIcon>
                        Classes
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton component={Link} to={'/account/subscriptions'}>
                        <ListItemIcon>
                            <FitnessCenterIcon/>
                        </ListItemIcon>
                        Subscription
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PaymentIcon/>
                        </ListItemIcon>
                        Payment
                    </ListItemButton>
                </ListItem>
            </List>
        )
    }
}
