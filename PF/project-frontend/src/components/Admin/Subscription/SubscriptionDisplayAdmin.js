import {
    Box,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";

import {GetTimeStringComp} from "../../subscriptions/GetTimeStringComp";
import {EditSubscription} from "./EditSubscription";
import {BASEURL} from "../../constants";
import axios from "axios";
import {APIContext} from "../../APIContextProvider";


export function SubscriptionDisplayAdmin(props){

    const ctx = useContext(APIContext)
    const data = props.data

    const [editBoxOpen, setEditBoxOpen] = useState(false)
    const [deleteBoxOpen, setDeleteBoxOpen] = useState(false)

    var duration = GetTimeStringComp(data['duration_map'])


    function sendDelete(remove){
        const targetURL = BASEURL + "subscriptions/" + data['id'] + '/'

        const token = ctx.userToken.replace('Token ')

        var formDat = new FormData()
        formDat.set('remove', remove)

        var requestData = {
            url: targetURL,
            method: "DELETE",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Token " + token
            },
            data: formDat
        }

        axios(requestData).then(function(response){
            if (props.onSend !== undefined){
                props.onSend()
            }
        }).catch(function(errors){
            let a = 1
        })
    }

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
                <Grid2 xs={4}>
                    <Stack spacing={1}>
                        <Typography variant='h5'>
                            {data['name']}
                        </Typography>
                        <Typography>
                            {duration.main}
                        </Typography>
                        <Typography>
                            ${data['price']}
                        </Typography>
                        <Typography>
                            {data['description']}
                        </Typography>
                    </Stack>
                </Grid2>
                <Grid2 xs={4}>
                    <Stack>
                        <Typography>
                            Total Subscriptions: {data['total_count']}
                        </Typography>
                        <Typography>
                            Active Subscriptions: {data['active_count']}
                        </Typography>
                    </Stack>
                </Grid2>
                <Grid2 xs={4}>
                    <Stack spacing={1}>
                        <Typography>
                            ID: {data['id']}
                        </Typography>
                        <Typography>
                            {data['available'] ? "Visible" : "Hidden"}
                        </Typography>
                        <Button
                            variant='outlined'
                            onClick={() => setDeleteBoxOpen(true)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => setEditBoxOpen(true)}
                        >
                            Edit
                        </Button>
                        <EditSubscription
                            data={data}
                            open={editBoxOpen}
                            onClose={() => setEditBoxOpen(false)}
                            onSend={props.onSend}
                        />
                        <Dialog open={deleteBoxOpen} onClose={() => setDeleteBoxOpen(false)}>
                            <DialogTitle>
                                Confirm Delete
                                <Typography>
                                    {data['name']}
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Box>
                                    Are you sure you want to fully delete the subscription?
                                    The Subscription can be set to invisible to stop future
                                    subscriptions.
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => setDeleteBoxOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={() => sendDelete(false)}
                                >
                                    Set Invisible
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => sendDelete(true)}
                                >
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </Grid2>
            </Grid2>
        </Card>
    )
}
