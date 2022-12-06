import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, Route, Routes} from "react-router-dom";
import AccountDashboard from "../user/AccountDashboard";
import EditProfile from "../user/EditProfile";
import AccountClasses from "../user/userclass/AccountClasses";
import AccountSubscriptions
    from "../user/usersubscription/AccountSubscriptions";
import AccountPayment from "../user/userpayment/AccountPayment";
import React from "react";
import {AdminMain} from "./AdminMain";
import {
    SubscriptionControlPanel
} from "./Subscription/SubscriptionControlPanel";
import {UserControlPanel} from "./User/UserControlPanel";

export function AdminLandingPage(){


    return (
        <Stack sx={{p:2}}>
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant='h3'>
                    Admin Control Panel
                </Typography>
            </Box>
            <Box
                sx={{p:3}}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Button>
                    Studio Management
                </Button>
                <Button>
                    Class Management
                </Button>
                <Button component={Link} to={'/admin/subscription'}>
                    Membership Management
                </Button>
                <Button component={Link} to={'/admin/users'}>
                    User Management
                </Button>
            </Box>
            <Routes>
                <Route path="" element={<AdminMain/>}/>
                <Route path="/subscription" element={<SubscriptionControlPanel/>}/>
                <Route path='/users' element={<UserControlPanel/>}/>
            </Routes>
        </Stack>
    )
}
