import React, {useContext, useState} from 'react';
import Button from "@mui/material/Button";
import {Box, LinearProgress, Paper, Stack} from "@mui/material";
import axios from "axios";

import SubscriptionsList from "./SubscriptionsList";
import {BASEURL} from "../constants";
import {
    SubscriptionPromoCards
} from "./SubscriptionPromoCards/SubscriptionPromoCards";
import SubscriptionBenefits
    from "./SubscriptionPromoCards/SubscriptionBenefits";
import {TopHeader} from "./SubscriptionPromoCards/TopHeader";

import {AllSubscriptions} from "./AllSubscriptions/AllSubscriptions";
import {APIContext} from "../APIContextProvider";
import {Link} from "react-router-dom";

export default function Subscription(){

    const ctx = useContext(APIContext)

    const [compState, setComp] = useState({
        axiosLoading: true,
        subscriptionsList: null,
        responseReceived: false,
    })

    const [allSubsOpen, setAllSubsOpen] = useState(false)

    function setCompState(data){
        var clone = {}
        Object.keys(compState).forEach(k => {
            clone[k] = compState[k]
        })
        Object.keys(data).forEach(k => {
            clone[k] = data[k]
        })
        setComp(clone)
    }

    function getSubscriptionOptions(){
        const targetURL = BASEURL + 'subscriptions/'
        const params = {
            page: 1
        }

        const requestData = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: params
        }

        axios(requestData).then(function(response){
            setCompState({
                subscriptionsList: response.data['results'],
                axiosLoading: false,
                responseReceived: true
            })
        }).catch(function(error){
            let a = 1

        })
    }

    if (!compState.responseReceived){
        getSubscriptionOptions()
    }

    let listItems = compState.subscriptionsList

    function SubBox(){
        if (compState.axiosLoading){
            return <LinearProgress />
        }
        else{
            return (
                <React.Fragment>
                    {<SubscriptionsList items={listItems}/>}
                    <Box style={{textAlign:'center'}}>
                        <Button onClick={e => setAllSubsOpen(true)}>
                            View All Subscriptions
                        </Button>
                        <AllSubscriptions
                            open={allSubsOpen}
                            onClose={e => setAllSubsOpen(false)}
                        />
                    </Box>
                </React.Fragment>
            )
        }
    }


    function JoinButton(){
        if (!ctx.userLoggedIn){
            return (
                <Button
                    variant='contained'
                    size='large'
                    component={Link}
                    to='/account'
                >
                    Join Today!
                </Button>
            )
        }
        return null
    }

    return (
            <Box>
                <TopHeader/>
                <Paper sx={{p:2, mx:2}}>
                    <Stack>
                        {JoinButton()}
                        {SubBox()}
                    </Stack>
                </Paper>
                <Box>
                    <SubscriptionPromoCards/>
                </Box>
                <Box sx={{px:2}} alignItems='center'>
                    <Paper sx={{p:1}}>
                        <SubscriptionBenefits/>
                    </Paper>
                </Box>
            </Box>
    )
}
