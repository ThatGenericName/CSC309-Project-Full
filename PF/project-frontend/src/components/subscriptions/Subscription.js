import React from 'react';
import Button from "@mui/material/Button";
import {Box, Paper, Stack, Typography} from "@mui/material";

import SubscriptionsList from "./SubscriptionsList";
import {SUBSCRIPTION_TEST_DATA} from "./SubscriptionTestData";
import {LIPSUM} from "../constants";
import {
    SubscriptionPromoCards
} from "./SubscriptionPromoCards/SubscriptionPromoCards";
import SubscriptionBenefits
    from "./SubscriptionPromoCards/SubscriptionBenefits";
import {TopHeader} from "./SubscriptionPromoCards/TopHeader";

export default function Subscription(){

    let data = SUBSCRIPTION_TEST_DATA

    let listItems = data['results']

    let t = LIPSUM

    return (
            <Box>
                <TopHeader/>
                <Paper sx={{p:2, mx:2}}>
                    <SubscriptionsList items={listItems}/>
                </Paper>
                <Box>
                    <SubscriptionPromoCards/>
                </Box>
                <Box sx={{px:2}} alignItems='center'>
                    <Paper sx={{p:1}}>
                        <SubscriptionBenefits/>
                    </Paper>
                </Box>
            </Box>
    )
}
