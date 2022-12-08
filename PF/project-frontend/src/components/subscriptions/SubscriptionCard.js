import {
    Card,
    CardActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useContext, useState} from "react";
import {SubscriptionPayment} from "./SubscriptionPayment";
import {APIContext} from "../APIContextProvider";
import {GetTimeStringComp} from "./GetTimeStringComp";

export function SubscriptionCard(props){

    const ctx = useContext(APIContext)

    const data = props.data

    var duration = GetTimeStringComp(data['duration_map'])

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


