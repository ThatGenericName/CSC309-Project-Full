import {
    Alert, Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Pagination, Snackbar,
    Stack
} from "@mui/material";
import React, {useState} from "react";
import {BASEURL} from "../../constants";
import axios from "axios";
import {SubscriptionsDetailed} from "./SubscriptionsDetailed";

export function AllSubscriptions(props){

    let [compState, setComp] = useState({
        data: [],
        axiosLoading: true,
        responseReceived: false,
        pages: 0,
        targetPage: 1
    })

    function setCompState(data){
        var dat = {}
        Object.keys(compState).forEach(k => {
            dat[k] = compState[k]
        })
        Object.keys(data).forEach(k => {
            dat[k] = data[k]
        })
        setComp(dat)
    }

    function getSubscriptionOptions(){
        const targetURL = BASEURL + 'subscriptions/'
        const params = {
            page: compState.targetPage
        }

        const requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: params
        }

        axios(requestData).then(function(response){


            setCompState({
                axiosLoading: false,
                responseReceived: true,
                data: response.data['results'],
                pages: Math.ceil(response.data['count'] / 10)
            })
        }).catch(function(error){
            let a = 1

        })
    }

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateSubscriptionsList(items){
        return (
            <Box
                sx={{p:1}}
                style={{maxHeight: "30%", overflow: 'auto'}}
            >
                <Stack spacing={2} alignItems='center'>
                    {items.map(item =>
                        <SubscriptionsDetailed
                            key={"sub_detailed_" + item['id']}
                            data={item}
                            onPaymentSuccess={() => setSnackbarOpen(true)}
                        />
                    )}
                </Stack>
            </Box>
        )
    }

    if (!compState.responseReceived){
        getSubscriptionOptions()
    }

    const vertical = 'bottom'
    const horizontal = 'center';

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth={true}
            PaperProps={{
                style:{
                    maxHeight: "80%"
                }
            }}

        >
            <DialogTitle>
                All Subscriptions
                <Box justifyItems='center'>
                    <Pagination
                        count={compState.pages}
                        onChange={(e, v) =>{
                            setCompState({
                                targetPage: v,
                                responseReceived: false
                            })
                        }}
                    />
                </Box>
            </DialogTitle>
            <DialogContent >
                <Box width="100%">
                    {generateSubscriptionsList(compState.data)}
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

            </DialogContent>
        </Dialog>
    )
}
