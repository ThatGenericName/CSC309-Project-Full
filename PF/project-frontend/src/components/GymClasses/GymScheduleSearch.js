import react, {useContext} from "react";
import {BASEURL} from "../constants";
import {APIContext} from "../APIContextProvider";
import {Box, Pagination, Paper, Stack, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import GymClassScheduleList from "./GymClassScheduleList";


export function ScheduleSearch() {
    let [searchParams, setSearchParams] = useSearchParams()
    let ctx = useContext(APIContext)

    let params = {
        name: searchParams.get('name'),
        coach_name: searchParams.get('coach_name'),
        date: searchParams.get('date'),
        time_range: searchParams.get('time_range')
    }

    Object.keys(params).forEach(k => {
        if (params[k] === null) {
            params[k] = ""
        }
    })


    return (
        <ScheduleClass searchParams={params} searchParamSetter={setSearchParams}/>
    )
}

class ScheduleClass extends react.Component {
    static contextType = APIContext

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchParams: props.searchParams,
            responseList: [],
            pages: 0,
            initSearch: true,
            targetPage: 1,
            urlParamSet: props.searchParamSetter
        }
    }

    getScheduleList(comp) {

        const targetURL = BASEURL + "classes/"
        const searchParams = comp.state.searchParams
        const params = {
            name: searchParams.name,
            coach_name: searchParams.coach_name,
            date: searchParams.date,
            time_range: searchParams.time_range,
            page: comp.state.targetPage
        }

        Object.entries(params).forEach(([key, value]) => {
            if (value === "" || value === null || value === undefined) {
                delete params[key]
            }
        })

        var token = ctx.userToken
        token = token.replace("Token ", "")

        const reqData = {
            url: targetURL,
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Token " + token
            },
            params: params
        }

        axios(reqData).then(function (response) {
            comp.setState({
                pages: Math.ceil(response.data['count'] / 10),
                responseList: response.data['results']
            })
        }).catch(function (error) {
            let a = 1
        })
    }

    setSearchParam(obj) {
        const clone = this.state.searchParams
        Object.entries(obj).forEach(entry => clone[entry[0]] = entry[1])
        this.setState({searchParams: clone})
    }

    searchForm() {

        return (
            <Grid2 container spacing={3}>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.name}
                        label='Class Name'
                        fullWidth
                        onChange={(e) => this.setSearchParam({name: e.target.value})}
                    />
                </Grid2>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.coach_name}
                        label='Coach Name'
                        fullWidth
                        onChange={(e) => this.setSearchParam({coach_name: e.target.value})}
                    />
                </Grid2>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.date}
                        label='Date'
                        fullWidth
                        onChange={(e) => this.setSearchParam({date: e.target.value})}
                    />
                </Grid2>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.time_range}
                        label='Time Range'
                        fullWidth
                        onChange={(e) => this.setSearchParam({time_range: e.target.value})}
                    />
                </Grid2>

                <Grid2 md={5} sm={4}/>
                <Grid2 md={5} sm={4}/>
            </Grid2>
        )
    }

    render() {
        if (this.state.initSearch) {
            this.setState({initSearch: false})
            this.getScheduleList(this)
        }


        const comp = this

        return (
            <Box
                sx={{
                    p: 3,
                    textAlign: 'center'
                }}
            >
                <Stack spacing={3}>
                    <Paper
                        sx={{
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Stack
                            sx={{
                                width: "100%"
                            }}
                            spacing={3}
                        >
                            {this.searchForm()}
                            <Box>
                                <Button
                                    variant='contained'
                                    size='large'
                                    onClick={() => {
                                        this.getScheduleList(comp)
                                    }}
                                >
                                    Search!
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                    <Paper sx={{p: 3}}>
                        <Stack spacing={3}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Pagination
                                    count={this.state.pages}
                                    onChange={(e, v) => {
                                        this.setState({
                                            targetPage: v,
                                            initSearch: true
                                        })
                                    }}
                                />
                            </Box>
                            <GymClassScheduleList items={this.state.responseList}/>
                        </Stack>
                    </Paper>
                </Stack>
            </Box>
        )
    }
}
