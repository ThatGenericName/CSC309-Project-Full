import React, {useContext, useState} from "react";
import {
    Accordion,
    AccordionSummary, Alert,
    Box,
    Card, Divider, LinearProgress, Pagination,
    Paper,
    Stack, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';

import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import {BASEURL} from "../../constants";
import {APIContext} from "../../APIContextProvider";
import SimpleTimeCard from '../SimpleTimeCard'
import FilterControls from "../FilterControls";
import {AccountSubscriptionPreview} from "./AccountSubscriptionPreview";
import {USER_SUB_TEST_DATA} from "./TestUserSubData";
import {ActiveSubscriptionDashboard} from "./ActiveSubscriptionDashboard";

const PAGINATION_SIZE = 10


export default class AccountSubscriptions extends React.Component{
    static contextType = APIContext

    constructor(props, context){
        super(props, context)
        this.state = {
            sortData: "asc",
            filterData: 'all',
            page: 1,
            axiosLoading: true,
            responseData: null,
            makeRequest: true
        }
    }

    makeRequest(inputState){
        const targetState = inputState === undefined ? this.state : inputState

        var targetURL = BASEURL + 'accounts/subscriptions/'

        var par = {
            page: targetState.page,
            sort: targetState.sortData,
            filter: targetState.filterData
        }

        var token = this.context.userToken
        token = token.replace("Token ")

        var requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            },
            params: par
        }

        const comp = this

        axios(requestData)
            .then( function (response) {
                comp.setState({
                    axiosLoading: false,
                    responseData: response.data,
                    makeRequest: false
                })
            })
            .catch(function(error){
                if (error.response.status === 404){
                    comp.setState({
                        axiosLoading: false,
                        responseData: {
                            'count': 0,
                            'next': null,
                            'previous': null,
                            'results': []
                        },
                        makeRequest: false
                    })
                }
                else{
                    comp.setState({
                    axiosLoading: false,
                    makeRequest: false
                })
                }
            })
    }

    generateList(ListData){
        return (
            <Stack spacing={2}>
                {ListData.map(data => {
                    return (
                        <AccountSubscriptionPreview
                            key={data['id']}
                            subData={data}
                            filterSetter={e => {
                                e.makeRequest = true
                                this.setState(e)
                            }}
                        />
                    )
                })}
            </Stack>
        )
    }

    componentDidMount() {
        if (this.state.makeRequest){
            this.makeRequest()
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.makeRequest){
            this.makeRequest(nextState)
        }
    }

    noResults(){
        return (
            <Alert severity="info">No results matching the filter criteria</Alert>
        )
    }

    render(){
        if (this.state.axiosLoading){
            return (
                <LinearProgress />
            )
        }
        else if (this.state.responseData === null){
            // not loaded yet
        }
        else{
            let inputData = this.state.responseData
            let inputList = inputData['results']
            let pages = Math.ceil(inputData['count'] / 10)

            return (
                <Stack spacing={3}>
                    <Box sx={{textAlign:'center'}}>
                        <ActiveSubscriptionDashboard
                            filterSetter={e => {
                                    e.makeRequest = true
                                    this.setState(e)
                                }}
                        />
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                        <FilterControls
                            filterSetter={e => {
                                    e.makeRequest = true
                                    this.setState(e)
                                }}
                            pcount={pages}
                        />
                        <Divider/>
                        {this.state.axiosLoading ? <LinearProgress /> : null}
                        {inputList.length === 0 ? this.noResults() : this.generateList(inputList)}
                    </Box>
                </Stack>
            )
        }
    }

}
