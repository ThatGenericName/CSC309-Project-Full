import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {Box, Paper, Stack, Typography} from "@mui/material";

import AmenityList from "./GenerateAmenityList";
import GetAmenity from "./GetAmenityData";
import {BASEURL, LIPSUM} from "../constants";
import axios from "axios";
import {Link, Route, Routes, useParams} from "react-router-dom";

export default function Amenity(props){

    const {id} = useParams()

    const [formData, setFormDat] = useState({
        data: null,
        axiosLoading: false,
        request_complete: false})

     const getdata = (props) => {
        const url = BASEURL + "studios/" + id + "/amenities/"

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
                }).catch(function (error) {})
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
                            `/studios/${id}/amenities/create/`}}>
                          Add Amenity
                        </Button>
                    </Box>
                </div>
                <br/>
                <Paper sx={{p:2, mx:2}}>
                    <AmenityList items={listItems}/>
                </Paper>
            </Box>
        )
    }

}
