import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";


import {BASEURL} from "../../constants";
import {APIContext} from "../../APIContextProvider";
import axios from "axios";

export function RemovePaymentMethod(props){

    const ctx = useContext(APIContext)

    const [dialogOpen, setDialogOpen] = useState(false)

    function handleClose(){
        setDialogOpen(false)
    }

    function handleOpen(){
        setDialogOpen(true)
    }

    function sendPaymentRemoval(){
        var targetURL = BASEURL + 'accounts/payment/remove/'

        var token = ctx.userToken
        token = token.replace("Token ")
        var requestData = {
            url: targetURL,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            },
        }

        axios(requestData).then(function(response){
            let a = 1
            props.onSend()
            handleClose()
        }).catch(function(error){
            let a = 1
        })
    }

    return (
        <Box>
            <Button variant='outlined' onClick={handleOpen}>
                Remove Payment Method
            </Button>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>
                    Remove Payment Method
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to remove your payment method?
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={sendPaymentRemoval}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
