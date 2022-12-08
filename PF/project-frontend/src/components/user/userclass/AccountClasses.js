import React from "react";
import {APIContext} from "../../APIContextProvider";
import {Alert, Box, Divider, LinearProgress, Stack} from "@mui/material";
import {BASEURL} from "../../constants";
import axios from "axios";
import {ClassSessionPreview} from "./ClassSessionPreview";
import FilterControls from "../FilterControls";
import {UpcomingClassesDashboard} from "./UpcomingClassesDashboard";

const PAGINATION_SIZE = 10


export default class AccountClasses extends React.Component {
    static contextType = APIContext

    constructor(props, context) {
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

    makeRequest(inputState) {
        const targetState = inputState === undefined ? this.state : inputState

        var targetURL = BASEURL + 'accounts/enrolledclasses/'

        var par = {
            page: targetState.page,
            sort: targetState.sortData,
            filter: targetState.filterData,
            dropped: 'true'
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
            .then(function (response) {
                comp.setState({
                    axiosLoading: false,
                    responseData: response.data,
                    makeRequest: false
                })
            })
            .catch(function (error) {
                if (error.response.status === 404) {
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
                } else {
                    comp.setState({
                        axiosLoading: false,
                        makeRequest: false
                    })
                }
            })
    }

    generateList(ListData) {
        return (
            <Stack spacing={2}>
                {ListData.map(data => {
                    return (
                        <ClassSessionPreview
                            classData={data}
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
        if (this.state.makeRequest) {
            this.makeRequest()
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.makeRequest) {
            this.makeRequest(nextState)
        }
    }

    noResults() {
        return (
            <Alert severity="info">No results matching the filter criteria</Alert>
        )
    }

    render() {
        if (this.state.axiosLoading) {
            return (
                <LinearProgress/>
            )
        } else if (this.state.responseData === null) {
            // not loaded yet
        } else {
            let inputData = this.state.responseData
            let inputList = inputData['results']
            let pages = Math.ceil(inputData['count'] / 10)

            return (
                <Stack spacing={3}>
                    <Box>
                        <UpcomingClassesDashboard
                            filterSetter={e => {
                                e.makeRequest = true
                                this.setState(e)
                            }}
                        />
                    </Box>
                    <Box sx={{textAlign: 'center'}}>
                        <FilterControls
                            filterSetter={e => {
                                e.makeRequest = true
                                this.setState(e)
                            }}
                            pcount={pages}
                        />
                        <Divider/>
                        {this.state.axiosLoading ? <LinearProgress/> : null}
                        {inputList.length === 0 ? this.noResults() : this.generateList(inputList)}
                    </Box>
                </Stack>
            )
        }
    }

}
