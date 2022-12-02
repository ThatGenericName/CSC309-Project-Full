import {Box, Stack} from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import {UpcomingClassesDashboard} from "./userclass/UpcomingClassesDashboard";
import {
    ActiveSubscriptionDashboard
} from "./usersubscription/ActiveSubscriptionDashboard";


export default function AccountDashboard(){
    return (
        <Paper elevation={3} sx={{textAlign:'center'}}>
            <Stack spacing={2}>
                <UpcomingClassesDashboard/>
                <ActiveSubscriptionDashboard/>
            </Stack>
        </Paper>
    )
}
