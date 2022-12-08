import {Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import react from "react";
import {APIContext} from "../../APIContextProvider";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import {BASEURL} from "../../constants";

const cardTypes = ['credit', 'debit']

export class AddPaymentMethod extends react.Component {
    static contextType = APIContext

    constructor(props, context) {
        super(props, context);
        this.state = {
            axiosLoading: false,
            inputData: {
                card_type: 'credit',
                card_num: '',
                card_name: '',
                exp_month: "1",
                exp_year: "2024"
            },
            errors: {
                card_num: '',
                card_name: '',
                exp_month: '',
                exp_year: ''
            }
        }
    }

    setInputData(obj) {
        var data = this.state.inputData
        Object.keys(obj).forEach(k => {
            data[k] = obj[k]
        })
        this.setState({inputData: data})
    }

    setError(obj) {
        var data = this.state.errors
        Object.keys(obj).forEach(k => {
            data[k] = obj[k]
        })
        this.setState({errors: data})
    }

    sendPaymentData(comp) {
        comp.setState({axiosLoading: true})
        const targetURL = BASEURL + "accounts/payment/add/"
        const dat = this.state.inputData

        var token = this.context.userToken.replace("Token ")

        var formDat = new FormData()

        Object.keys(dat).forEach(k => {
            var v = "" + dat[k]
            formDat.set(k, v)
        })

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
            let a = 1
            comp.props.onSend()
            comp.props.onClose()
        }).catch(function (error) {
            let a = 1
            comp.props.onClose()
        })
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>
                    Add Payment Information
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={1} sx={{p: 1}}>
                        <TextField
                            select
                            id='card_type'
                            label='Card Type'
                            value={this.state.inputData.card_type}
                            onChange={e => {
                                this.setInputData({card_type: e.target.value})
                            }}
                        >
                            {cardTypes.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            label={'Cardholder Name'}
                            id='card_name'
                            value={this.state.inputData.card_name}
                            onChange={e => {
                                this.setInputData({card_name: e.target.value})
                            }}
                        />
                        <TextField
                            required
                            label={'Card Number'}
                            id='card_num'
                            value={this.state.inputData.card_num}
                            onChange={e => {
                                var next = e.target.value
                                if (next === "") {
                                    this.setInputData({card_num: next})
                                }
                                var parsed = parseInt(next)
                                if (!isNaN(parsed) && next.length <= 16) {
                                    // do nothing
                                    this.setInputData({card_num: parsed})
                                }
                            }}
                        />
                        <TextField
                            required
                            id='exp_month'
                            type="number"
                            label='expiration month'
                            value={this.state.inputData.exp_month}
                            InputProps={{inputProps: {min: 1, max: 12}}}
                            onChange={e => {
                                this.setInputData({exp_month: e.target.value})
                            }}
                        />
                        <TextField
                            required
                            id='exp_month'
                            type="number"
                            label='expiration year'
                            value={this.state.inputData.exp_year}
                            InputProps={{inputProps: {min: 2022, max: 5000}}}
                            onChange={e => {
                                this.setInputData({exp_year: e.target.value})
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={this.props.onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={e => this.sendPaymentData(this)}
                    >
                        Add Payment Method
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

