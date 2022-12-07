import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {Box, Paper, Stack, Typography} from "@mui/material";

import {BASEURL, LIPSUM} from "../constants";
import axios from "axios";
import {Link, Route, Routes} from "react-router-dom";
import StudioList from "./StudioList"

export default function Studio(props){

    const [formData, setFormDat] = useState({
        data: null,
        axiosLoading: false,
        request_complete: false})

     const  getdata =  (props) => {
         const url = BASEURL + "studios/"

         if (!formData.axiosLoading) {
             let requestData = {
                 url: url,
                 method: "GET",
                 headers: {
                     'Content-Type': 'application/json'
                 },
             }

              axios(requestData).then(function (response) {
                 setFormDat({
                     data: response.data,
                     axiosLoading: false,
                     request_complete: true
                 })
             }).catch(function (error) {
             })
         }
     }

    if(!formData.request_complete)
        getdata(props)


    // getdata(props.props)
    var listItems = []

    if(formData.data)
        listItems = formData.data["results"]


    if(formData.request_complete){
        return (
            <Box>
                {/*<TopHeader/>*/}
                <br/>
                <div>
                    <Box textAlign='center'>
                        <Button variant='contained' component={Link} to={{pathname:
                            `/studios/create/`}}>
                          Add Studio
                        </Button>
                    </Box>
                </div>
                <br/>
                <Paper sx={{p:2, mx:2}}>
                    <StudioList items={listItems}/>
                </Paper>
            </Box>
        )
    }


}
