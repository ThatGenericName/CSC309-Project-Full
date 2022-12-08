import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import {Link} from "react-router-dom";


export function SubscriptionPayment(props) {
    // this is having alot of issues, might need to change this to a class based component
    const ctx = useContext(APIContext)

    const [data, setData] = useState({
        confirmPin: "",
        axiosLoading: true,
        paymentData: null,
        paymentAxios: false,
        hasPaymentInformation: false
    })

    function loadPaymentData() {

        var targetURL = BASEURL + 'accounts/payment/'
        var token = ctx.userToken

        if (token === null) {
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

        axios(requestData).then(function (response) {
            var data = response.data

            setData({
                confirmPin: "",
                paymentData: data,
                axiosLoading: false,
                paymentSuccess: data.paymentSuccess,
                hasPaymentInformation: true
            })

        }).catch(function (error) {
            if (error.response.status === 404) {
                var dat = data
                dat.axiosLoading = false
                dat.hasPaymentInformation = false
                setData(dat)
            }

            var a = 1
        })
    }

    function paymentOptionSection() {
        if (data.paymentData === null) {
            loadPaymentData()
        }
        if (data.axiosLoading) {
            return (
                <Box>
                    <LinearProgress/>
                </Box>
            )
        } else if (!data.hasPaymentInformation) {
            return (
                <Box>
                    You do not have a payment option enabled
                    <Button
                        component={Link}
                        to={'/account/payment'}
                    >
                        Add Payment Method
                    </Button>
                </Box>
            )
        } else {
            return (
                <Box>
                    Current Payment Option:
                    <PaymentPreview cardData={data.paymentData}/>
                </Box>
            )
        }
    }

    function cartTable() {
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

    function pay() {
        const targetURL = BASEURL + 'accounts/subscriptions/add/'
        var token = ctx.userToken.replace("Token ")

        var dat1 = {}
        Object.keys(data).forEach(k => {
            dat1[k] = data[k]
        })
        dat1.paymentAxios = true
        setData(dat1)

        if (token === null) {
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

        axios(requestData).then(function (response) {
            var dataState = {}
            Object.keys(data).forEach(k => {
                dataState[k] = data[k]
            })
            dataState.paymentAxios = false
            setData(dataState)
            props.onPaymentSuccess()
            props.onClose()
            ctx.updateDataFlag()
        }).catch(function (error) {
            var a = 1
        })
    }

    const disabledButton = (
        <Button
            variant='contained'
            disabled
        >
            Subscribe
        </Button>
    )

    const enabledButton = (
        <Button
            variant='contained'
            onClick={pay}
        >
            Subscribe
        </Button>
    )


    function subButton() {
        return (
            <Box>
                <Button variant='outlined' onClick={props.onClose}>
                    Cancel
                </Button>
                {(!data.axiosLoading && data.hasPaymentInformation) ? enabledButton : disabledButton}
            </Box>
        )
    }


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
                            var dat = {}
                            Object.keys(data).forEach(k => {
                                dat[k] = data[k]
                            })
                            dat['confirmPin'] = e.target.value
                            setData(dat)
                        }}
                    />
                    {cartTable()}
                </Stack>
            </DialogContent>
            <DialogActions>
                {subButton()}
            </DialogActions>
        </Dialog>
    )
}
