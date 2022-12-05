import react from "react";
import {APIContext} from "../../APIContextProvider";
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Stack, Switch,
    TextField, Typography
} from "@mui/material";
import {BASEURL} from "../../constants";
import axios from "axios";


export class CreateSubscription extends react.Component{
    static contextType = APIContext

    constructor(props, context){
        super(props, context)

        this.state = {
            originalData: {
                name: "",
                description: "",
                price: "",
                available: true,
                hours: "",
                days: ""
            },
            inputData: {
                name: "",
                description: "",
                price: "",
                available: true,
                hours: "",
                days: ""
            },
            errors: {
                name: "",
                description: "",
                price: "",
                available: "",
                hours: "",
                days: ""
            },
            axiosLoading: false,
            respReceived: false,
            successPrompt: false
        }
        let a = 1
    }

    setErrorState(obj){
        var clone = {}
        Object.keys(this.state.errors).forEach(k => {
            clone[k] = this.state.errors[k]
        })
        Object.keys(obj).forEach(k => {
            clone[k] = obj[k]
        })
        this.setState({errors: clone})
    }

    setInputState(obj){
        var clone = {}
        Object.keys(this.state.inputData).forEach(k => {
            clone[k] = this.state.inputData[k]
        })
        Object.keys(obj).forEach(k => {
            clone[k] = obj[k]
        })
        this.setState({inputData: clone})
    }

    generateForm(){
        const comp = this
        return (
            <Stack spacing={2}>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography>
                        Visible
                    </Typography>
                    <Switch
                        checked={comp.state.inputData.available}
                        onChange={(e, v) => {comp.setInputState({available: v})}}
                    />
                </Box>

                <TextField
                    label={'Name'}
                    error={Boolean(comp.state.errors.name.length)}
                    value={comp.state.inputData.name}
                    onChange={e => comp.setInputState({name: e.target.value})}
                />
                <TextField
                    label={'Description'}
                    multiline
                    error={Boolean(comp.state.errors.description.length)}
                    value={comp.state.inputData.description}
                    onChange={e => comp.setInputState({description: e.target.value})}
                />
                <TextField
                    label='Price'
                    type='number'
                    error={Boolean(comp.state.errors.price.length)}
                    value={comp.state.inputData.price}
                    step={1.00}
                    onChange={e => comp.setInputState({price: e.target.value})}
                />
                <TextField
                    label='Hours'
                    type='number'
                    error={Boolean(comp.state.errors.hours.length)}
                    value={comp.state.inputData.hours}
                    step={1.00}
                    InputProps={{ inputProps: { min: 0, max: 24 } }}
                    onChange={e => comp.setInputState({hours: e.target.value})}
                />
                <TextField
                    label='Days'
                    type='number'
                    error={Boolean(comp.state.errors.days.length)}
                    value={comp.state.inputData.days}
                    step={1.00}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={e => comp.setInputState({days: e.target.value})}
                />
            </Stack>
        )
    }

    resetData(){
        this.setInputState(this.state.originalData)
    }

    sendChanges(){
        let data = this.state.inputData

        const targetURL = BASEURL + "subscriptions/create/"

        const token = this.context.userToken.replace('Token ')

        const formDat = new FormData()
        Object.keys(data).forEach(k => {
            formDat.set(k, data[k])
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
        const comp = this
        axios(requestData).then(function(response){
            comp.setState({
                axiosLoading: false,
                respReceived: false,
                successPrompt: true
            })
            if (comp.props.onSend !== undefined){
                comp.props.onSend()
            }
        }).catch(function(errors){
            let a = 1
        })
    }


    render(){
        let comp = this
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>
                    Create New Membership Plan
                </DialogTitle>
                <DialogContent>
                    {this.generateForm()}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={function(){
                            comp.resetData()
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={comp.props.onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={function(){
                            comp.sendChanges()
                        }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
