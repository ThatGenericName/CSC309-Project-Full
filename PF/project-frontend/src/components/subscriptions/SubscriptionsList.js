import {Alert, Box, Snackbar, Stack} from "@mui/material";
import {SubscriptionCard} from "./SubscriptionCard";
import React, {useState} from "react";

export default function SubscriptionsList(props){

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateSubscriptionsList(items){
        return (
            <Stack direction='row' spacing={2} alignItems='center'>
                {items.map(item => <SubscriptionCard data={item} onPaymentSuccess={() => setSnackbarOpen(true)}/>)}
            </Stack>
        )
    }

    const vertical = 'bottom'
    const horizontal = 'center';

    return (
        <Box sx={{p:2}} style={{maxWidth: "100%", overflow: 'auto'}}>
            {generateSubscriptionsList(props.items)}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={8000}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
        </Box>
    )
}
