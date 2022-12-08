import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {Box, Paper} from "@mui/material";

import {BASEURL} from "../constants";
import axios from "axios";
import {Link} from "react-router-dom";
import StudioList from "./StudioList"

export default function Studio(props){


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

     const getdata =  (props) => {
         const url = BASEURL + "studios/"

         var params = {
            page: compState.targetPage
        }


         let requestData = {
             url: url,
             method: "GET",
             headers: {
                 'Content-Type': 'application/json'
             },
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


    // getdata(props.props)
    var listItems = []

    if(compState.data)
        listItems = compState.data["results"]


    function forceReload(){
        setCompState({
            respReceived: false,
            axiosLoading: true,
            onSendFlag: true
        })
    }

    if (!compState.respReceived || props.reloadFlag){
        getdata()
    }


    if(compState.respReceived){

        return (
            <Box>
                {/*<TopHeader/>*/}
                <br/>
                <div>
                    <Box textAlign='center'>
                        <Button variant='contained' component={Link} to={{pathname:
                            `/studio/create/`}}>
                          Add Studio
                        </Button>
                    </Box>
                </div>
                <br/>
                <Paper sx={{p:2, mx:2}}>
                    <StudioList items={listItems} onSend={forceReload}/>
                </Paper>
            </Box>
        )
    }


}
