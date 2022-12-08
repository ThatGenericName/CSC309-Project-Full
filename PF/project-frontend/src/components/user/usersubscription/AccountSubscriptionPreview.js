import {Box, Card, Paper} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import React from "react";

import SimpleTimeCard from "../SimpleTimeCard";
import {getTimeObj} from "../TimeObject";
import {PaymentPreview} from "../PaymentPreview";
import UnsubscribeButton from "./UnsubscribeButton";


export function AccountSubscriptionPreview(props) {
    var subscriptionData = props.subData
    var startTime = Date.parse(subscriptionData['start_time'])
    var endTime = Date.parse(subscriptionData['end_time'])


    var startTimeObj = getTimeObj(startTime)
    var endTimeObj = getTimeObj(endTime)

    var now = Date.now()
    var nowObj = getTimeObj(now)

    let paymentTimeCard
    if (subscriptionData['payment_time'] !== null) {
        var paymentTime = Date.parse(subscriptionData['payment_time'])
        var paymentTimeObj = getTimeObj(paymentTime)
        paymentTimeCard = <SimpleTimeCard timeObj={paymentTimeObj}/>
    } else {
        paymentTimeCard = (
            <Card
                variant="outlined"
                justifyContent="center"
                sx={{p: 1}}>
                <Box>
                    Unpaid
                </Box>
            </Card>
        )
    }

    var statusSlot

    if (now < startTime) {
        statusSlot = <UnsubscribeButton
            subID={props.subData['id']}
            filterSetter={props.filterSetter}
        />
    } else {
        if (now > endTime) {
            statusSlot = (
                <Paper sx={{p: 1}} variant="outlined">
                    Subscription Over
                </Paper>
            )
        } else {
            statusSlot = (
                <Paper sx={{p: 1}} variant="outlined">
                    Subscription Active
                </Paper>
            )
        }
    }


    return (
        <Card sx={{p: 1}} variant="outlined">
            <Grid2
                container
                columns={24}
                rowSpacing={1}
                columnSpacing={1}
                alignItems="center"
                justifyContent='center'
            >
                <Grid2 xs={14}>
                    <Box sx={{fontWeight: 'bold', fontSize: 24}}>
                        {subscriptionData['subscription']['name']}
                    </Box>
                </Grid2>
                <Grid2 xs={3}>
                    {subscriptionData['recurring'] ? "Recurring" : null}
                </Grid2>
                <Grid2 xs={7}>
                    {statusSlot}
                </Grid2>
                <Grid2 xs={5}>
                    <SimpleTimeCard timeObj={startTimeObj}/>
                </Grid2>
                <Grid2 xs={1}>
                    <ArrowRightAltIcon/>
                </Grid2>
                <Grid2 xs={5}>
                    <SimpleTimeCard timeObj={endTimeObj}/>
                </Grid2>
                <Grid2 xs={5}>
                    {paymentTimeCard}
                </Grid2>
                <Grid2 xs>
                    <PaymentPreview cardData={subscriptionData['payment_detail']}/>
                </Grid2>
            </Grid2>
        </Card>
    )
}
