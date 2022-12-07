import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {Box, Paper, Stack, Typography} from "@mui/material";

import {BASEURL, LIPSUM} from "../constants";
import axios from "axios";
import {Link, Route, Routes, useParams} from "react-router-dom";
import GymClassList from "./GymClassList"

export default function GymClass(props){

    const [formData, setFormDat] = useState({
        data: null,
        axiosLoading: false,
        request_complete: false})

    const {id}  = useParams()

     const  getdata =  (props) => {
         const url = BASEURL + "classes/" + id + "/list/"

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
                            `/class/${id}/create/`}}>
                          Add Gym Class
                        </Button>
                    </Box>
                </div>
                <br/>
                <Paper sx={{p:2, mx:2}}>
                    <GymClassList items={listItems}/>
                </Paper>
            </Box>
        )
    }


}
