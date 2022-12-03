import {
    Box,
    Card,
    CardActions, DialogContent,
    DialogTitle,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useContext, useState} from "react";
import {SubscriptionPayment} from "./SubscriptionPayment";
import {APIContext} from "../APIContextProvider";

export function SubscriptionCard(props){

    const ctx = useContext(APIContext)

    const data = props.data

    var duration = getTimeStringComp(data['duration_map'])

    const [open, setOpen] = useState(false)
    const [openSub, setOpenSub] = useState(false)

    function handleClose(){
        setOpen(false)
    }

    function handleOpen(){
        setOpen(true)
    }

    function handleSubscriptionOpen(){
        setOpenSub(true)
    }

    function handleSubscriptionClose(){
        setOpenSub(false)
    }

    var subButton = ctx.userLoggedIn ? (
        <Button onClick={handleSubscriptionOpen} variant='contained'>
        Subscribe
        </Button>) : null

    return (
        <Card
            style={{
                textAlign: "center",
                minWidth: 270,
                maxWidth: 270,

            }}
            variant='outlined'
        >
            <Stack spacing={2} sx={{m: 2}}>
                <Typography variant='h4'>
                    {data['name']}
                </Typography>
                <Stack>
                    <Typography>
                        {"$" + data['price']}
                    </Typography>
                    <Typography>
                        {duration.main}
                    </Typography>
                </Stack>
                {subButton}
            </Stack>
            <CardActions>
                <Button size='small' onClick={handleOpen}>
                    More Details
                </Button>
            </CardActions>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {data['name']}
                </DialogTitle>
                <DialogContent>
                    {data['description']}
                </DialogContent>
            </Dialog>
            <SubscriptionPayment
                open={openSub}
                onClose={handleSubscriptionClose}
                item={data}
                onPaymentSuccess={props.onPaymentSuccess}
            />
        </Card>
    )
}

function getTimeStringComp(timeMap){
    var monthInt = Math.floor(timeMap['days'] / 30)
    var monthIntRem = timeMap['days'] % 30
    var monthComp = monthInt === 0 ? "" : monthInt + (monthInt > 1 ? " months " : " month ")

    var weekInt = Math.floor(monthIntRem / 7)
    var weekIntRem = monthIntRem % 7
    var weekComp = weekInt === 0 ? "" : weekInt + (weekInt > 1 ? " weeks " : " week ")
    var hour = timeMap['hours']
    var min = timeMap['minutes']
    var seconds = timeMap['seconds']

    var daysComp = weekIntRem === 0 ? "" : weekIntRem + (weekIntRem > 1 ? " days " : " day ")
    var hoursComp = hour === 0 ? "" : hour + (hour > 1 ? " hours " : " hour ")
    var minuteComp = min === 0 ? '' : min + (min > 1 ? " minutes " : " minute ")
    var secondsComp = seconds === 0 ? '' : seconds + (seconds > 1 ? ' seconds ' : " second ")

    return {
        main: monthComp + weekComp + daysComp + hoursComp + minuteComp + secondsComp,
        month: monthComp,
        week: weekComp,
        days: daysComp,
        hours: hoursComp,
        minutes: minuteComp,
        seconds: secondsComp
    }
}
