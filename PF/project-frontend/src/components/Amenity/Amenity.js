import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {Box, LinearProgress, Pagination, Paper} from "@mui/material";

import AmenityList from "./GenerateAmenityList";
import {BASEURL} from "../constants";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function Amenity(props){

    const {id} = useParams()

    const [compState, setComp] = useState({
        list: [],
        pages: 0,
        targetPage: 1,
        axiosLoading: false,
        respReceived: false,
        onSendFlag: false
    })

    function setCompState(obj){
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
        const url = BASEURL + "studios/" + id + "/amenities/"

         var params = {
            page: compState.targetPage
         }


        let requestData = {
            url: url,
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
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
        }).catch(function (error) {})

    }

    function forceReload(){
        setCompState({
            respReceived: false,
            axiosLoading: true,
            onSendFlag: true
        })
    }

    if(!compState.respReceived)
        getdata(props)


    if(compState.respReceived){
        return (

            <Box>
                {/*<TopHeader/>*/}
                <br/>

                <div>
                    {props.admin && <React.Fragment>
                        <Box textAlign='center'>
                            <Button variant='contained' component={Link} to={{pathname:
                                `/studio/${id}/amenities/create/`}}>
                              Add Amenity
                            </Button>
                        </Box>
                    </React.Fragment>}

                </div>
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
                            if (v !== compState.targetPage){
                                setCompState({
                                    targetPage: v,
                                    respReceived: false,
                                    axiosLoading: true
                                })
                            }
                        }}
                    />
                </Box>
                <Paper sx={{p:2, mx:2}}>
                    {compState.axiosLoading ? <LinearProgress/> : <AmenityList
                        admin={props.admin}
                        items={compState.list}
                        onSend={forceReload}
                    />}
                </Paper>
            </Box>
        )
    }

}
