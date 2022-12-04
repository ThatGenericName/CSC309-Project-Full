import {Card, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {SubscriptionPayment} from "../SubscriptionPayment";
import {useState} from "react";
import {GetTimeStringComp} from "../GetTimeStringComp";

export function SubscriptionsDetailed(props){
    const data = props.data
    const [openSub, setOpenSub] = useState(false)

    var duration = GetTimeStringComp(data['duration_map'])

    return (
        <Card
            variant='outlined'
            sx={{p:2}}
            style={{width:'90%'}}
        >
            <Grid2
                container
                alignItems='center'
            >
                <Grid2 xs={8}>
                    <Stack spacing={1}>
                        <Typography variant='h5'>
                            {data['name']}
                        </Typography>
                        <Typography>
                            {duration.main}
                        </Typography>
                        <Typography>
                            {data['description']}
                        </Typography>
                    </Stack>
                </Grid2>
                <Grid2 xs={4}>
                    <Button onClick={e => setOpenSub(true)}>
                        Subscribe: ${data['price']}
                    </Button>
                    <SubscriptionPayment
                        open={openSub}
                        onClose={e => setOpenSub(false)}
                        item={data}
                        onPaymentSucces={props.onPaymentSuccess}
                    />
                </Grid2>
            </Grid2>
        </Card>
    )


}
