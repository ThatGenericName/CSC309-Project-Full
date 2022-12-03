import React from 'react';
import Button from "@mui/material/Button";
import {Box, Paper, Stack, Typography} from "@mui/material";

import SubscriptionsList from "./SubscriptionsList";
import {SUBSCRIPTION_TEST_DATA} from "./SubscriptionTestData";
import {LIPSUM} from "../constants";

export default function Subscription(){

    let data = SUBSCRIPTION_TEST_DATA

    let listItems = data['results']

    let t = LIPSUM

    return (
            <Box>
                <Paper sx={{m:3, p:2}}>
                    <Stack spacing={2}>
                        <Typography style={{textAlign: "center",}} variant='h1'>
                            Subscriptions
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                {LIPSUM[0]}
                            </Box>
                            <Box>
                                {LIPSUM[1]}
                            </Box>
                        </Stack>
                    </Stack>
                </Paper>
                <Paper sx={{p:2, m:0}}>
                    <SubscriptionsList items={listItems}/>
                </Paper>
            </Box>
    )
}
