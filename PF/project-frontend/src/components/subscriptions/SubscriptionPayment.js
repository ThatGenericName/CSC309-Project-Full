import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {APIContext} from "../APIContextProvider";
import {useContext, useState} from "react";
import {PaymentPreview} from "../user/PaymentPreview";
import axios from "axios";
import {BASEURL} from "../constants";


export function SubscriptionPayment(props){
    // this is having alot of issues, might need to change this to a class based component
    const ctx = useContext(APIContext)

    const [data, setData] = useState({
        confirmPin: "",
        axiosLoading: true,
        paymentData: null,
        paymentAxios: false
    })

    function loadPaymentData(){

        var targetURL = BASEURL + 'accounts/payment/'
        var token = ctx.userToken

        if (token === null){
            return
        }
        token = token.replace('Token ')

        var requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Token " + token
            }
        }

        axios(requestData).then(function(response) {
            var data = response.data

            setData({
                confirmPin: null,
                paymentData: data,
                axiosLoading: false,
                paymentSuccess: data.paymentSuccess,
            })
        }).catch(function (error){
            var a = 1
        })
    }

    function paymentOptionSection(){
        if (data.paymentData === null){
            loadPaymentData()
        }
        if (data.axiosLoading){
            return (
                <Box>
                    <LinearProgress />
                </Box>
            )
        }
        else{
            return (
                <Box>
                    Current Payment Option:
                    <PaymentPreview cardData={data.paymentData}/>
                </Box>
            )
        }
    }

    function cartTable(){
        var price = parseFloat(props.item['price'])
        var tax = price * 0.13
        var total = price * 1.13
        var itemName = props.item['name']

        return (
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Item
                        </TableCell>
                        <TableCell>
                            Price
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {itemName}
                        </TableCell>
                        <TableCell>
                            ${props.item['price']}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Tax
                        </TableCell>
                        <TableCell>
                            ${tax}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Total
                        </TableCell>
                        <TableCell>
                            ${total}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }

    function pay(){
        var targetURL = BASEURL + 'accounts/subscriptions/add/'
        var token = ctx.userToken

        var dat1 = data
        dat1.paymentAxios = true
        setData(dat1)

        if (token === null){
            return
        }
        token = token.replace('Token ')

        var formDat = new FormData()

        formDat.set('id', props.item['id'])
        formDat.set('pin', data.confirmPin)

        var requestData = {
            url: targetURL,
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Token " + token
            },
            data: formDat
        }

        axios(requestData).then(function(response) {
            var dataState = data
            dataState.paymentAxios = false
            setData(dataState)
            props.onPaymentSuccess()
            props.onClose()
        }).catch(function (error){
            var a = 1
        })
    }


    const btnNm = (
        <Box>
            <Button variant='outlined' onClick={props.onClose}>
                Cancel
            </Button>
            <Button variant='contained' onClick={pay}>
                Subscribe
            </Button>
        </Box>
    )

    let a = 1

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>
                Subscribe
            </DialogTitle>
            <DialogContent>
                {data.axiosLoading && <LinearProgress/>}
                <Stack spacing={1}>
                    {paymentOptionSection()}
                    <TextField
                        required
                        id='pin'
                        label='cvv'
                        value={data.confirmPin}
                        onChange={e => {
                            var dat = data
                            data['confirmPin'] = e.target.value
                            setData(dat)
                        }}
                    />
                    {cartTable()}
                </Stack>
            </DialogContent>
            <DialogActions>
                {btnNm}
            </DialogActions>
        </Dialog>
    )
}
