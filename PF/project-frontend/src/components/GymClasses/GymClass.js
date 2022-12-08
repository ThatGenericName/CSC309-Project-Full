import React, {useContext, useState} from 'react';
import Button from "@mui/material/Button";
import {Box, Pagination, Paper} from "@mui/material";

import {BASEURL} from "../constants";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import GymClassList from "./GymClassList"
import {APIContext} from "../APIContextProvider";

export default function GymClass(props) {

    let ctx = useContext(APIContext)

    const [compState, setComp] = useState({
        list: [],
        pages: 0,
        targetPage: 1,
        axiosLoading: false,
        respReceived: false,
        onSendFlag: false
    })

    const {id, id_2} = useParams()

    function setCompState(obj) {
        var d = {}
        Object.keys(compState).forEach(k => {
            d[k] = compState[k]
        })
        Object.keys(obj).forEach(k => {
            d[k] = obj[k]
        })
        setComp(d)
    }

    const getdata = (props) => {

        var url

        if(props.admin){
            url = BASEURL + "classes/" + id + "/list/admin"
        }
        else{
            url = BASEURL + "classes/" + id + "/list/"
        }

        var params = {
            page: compState.targetPage
        }

        var token = ctx.userToken
        token = token.replace("Token ", "")

        let requestData = {
            url: url,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + token
            },
            params: params
        }

        axios(requestData).then(function (response) {
            let pages = Math.ceil(response.data['count'] / 10)

            setCompState({
                list: response.data['results'],
                pages: pages,
                axiosLoading: false,
                respReceived: true,
                onSendFlag: false
            })
            props.onUpdate()
        }).catch(function (error) {
        })

    }

    function forceReload() {
        setCompState({
            respReceived: false,
            axiosLoading: true,
            onSendFlag: true
        })
    }

    if (!compState.respReceived)
        getdata(props)


    if (compState.respReceived) {
        return (
            <Box>
                {/*<TopHeader/>*/}
                <br/>
                <div>
                    {props.admin && <React.Fragment>
                        <Box textAlign='center'>
                            <Button variant='contained' component={Link} to={{
                                pathname:
                                    `/class/${id}/create/`
                            }}>
                                Add Gym Class
                            </Button>
                        </Box>
                    </React.Fragment>}

                </div>
                <br/>
                <Paper sx={{p: 2, mx: 2}}>
                    <br/>
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Pagination
                            count={compState.pages}
                            onChange={(e, v) => {
                                if (v !== compState.targetPage) {
                                    setCompState({
                                        targetPage: v,
                                        respReceived: false,
                                        axiosLoading: true
                                    })
                                }
                            }}
                        />
                    </Box>
                    <br/>
                    <GymClassList admin={props.admin} items={compState.list} onSend={forceReload}/>
                </Paper>
            </Box>
        )
    }


}
