import {Box, LinearProgress, Pagination, Paper, Stack} from "@mui/material";
import {useContext, useState} from "react";
import {SubscriptionDisplayAdmin} from "./SubscriptionDisplayAdmin";
import {BASEURL} from "../../constants";
import {APIContext} from "../../APIContextProvider";
import axios from "axios";


export function AdminSubscriptionList(props){

    const ctx = useContext(APIContext)

    const [compState, setComp] = useState({
        list: [],
        pages: 0,
        targetPage: 1,
        axiosLoading: false,
        respReceived: false,
        onSendFlag: false
    })

    const [onSendFlag, setOnSendFlag] = useState(false)

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

    function getSubscriptions(){
        const targetURL = BASEURL + "/subscriptions/admin/all/"

        var params = {
            page: compState.targetPage
        }

        if (ctx.userToken === null){
            return
        }

        const token = ctx.userToken.replace("Token ")

        var requestData = {
            url: targetURL,
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Token " + token
            },
            params: params
        }

        axios(requestData).then(function(response){

            let pages = Math.ceil(response.data['count'] / 10)

            setCompState({
                list: response.data['results'],
                pages: pages,
                axiosLoading: false,
                respReceived: true,
                onSendFlag: false
            })
            props.onUpdate()
        }).catch(function(error){
            let a = 1
        })
    }

    function generateSubscriptionList(items){
        return (
            <Stack spacing={2}>
                {items.map(item =>
                    <SubscriptionDisplayAdmin
                        data={item}
                        onSend={forceReload}
                    />
                )}
            </Stack>
        )
    }

    function forceReload(){
        setCompState({
            respReceived: false,
            axiosLoading: true,
            onSendFlag: true
        })
    }


    if (!compState.respReceived || props.reloadFlag){
        getSubscriptions()
    }

    return (
        <Paper variant='outlined' sx={{p:1}}>
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
            {compState.axiosLoading ? <LinearProgress/> : generateSubscriptionList(compState.list)}
        </Paper>
    )
}
