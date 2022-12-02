import {Box, ButtonGroup, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useContext, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import {APIContext} from "../../APIContextProvider";
import {BASEURL} from "../../constants";
import axios from "axios";


export default function UnsubscribeButton(props){
    const ctx = useContext(APIContext)

    const [dialogueState, setDialogueState] = useState(false)

    const [axiosLoading, setAxiosLoading] = useState(false)


    function dropSubscription(){
        setDialogueState(true)
    }

    function handleClose(){
        setDialogueState(false)
    }


    function send(){
        setAxiosLoading(true)

        const token = ctx.userToken.replace("Token ")

        var targetURL = BASEURL + 'accounts/subscriptions/' + props.subID + '/'

        var requestData = {
            method: 'delete',
            url: targetURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            }
        }

        axios(requestData)
            .then(function (response) {
                setAxiosLoading(false)
                // class has been dropped, now what?
                props.filterSetter({makeRequest: true})
                handleClose()
            })
            .catch(function (error) {
                // ya dun goof'd
                let a = 1
            })
    }


    return (
        <Box>
            <Button onClick={dropSubscription} variant="outlined">
                Unsubscribe
            </Button>
            <Dialog open={dialogueState} onClose={handleClose}>
                <Box sx={{p:3}}>
                    <Stack>
                        <Box>
                            Are you sure you want to unsubscribe?
                        </Box>
                        <Box>
                            Future recurring subscriptions will also be cancelled.
                        </Box>
                    </Stack>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={send}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
