import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Route, Routes} from "react-router-dom";
import AccountDashboard from "../user/AccountDashboard";
import EditProfile from "../user/EditProfile";
import AccountClasses from "../user/userclass/AccountClasses";
import AccountSubscriptions
    from "../user/usersubscription/AccountSubscriptions";
import AccountPayment from "../user/userpayment/AccountPayment";
import React from "react";
import {AdminMain} from "./AdminMain";

export function AdminLandingPage(){


    return (
        <Stack sx={{p:2}}>
            <Box
                style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
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
                <Button>
                    Membership Management
                </Button>
                <Button>
                    User Management
                </Button>
            </Box>
            <Routes>
                <Route path="" element={<AdminMain/>}/>
            </Routes>
        </Stack>
    )
}
