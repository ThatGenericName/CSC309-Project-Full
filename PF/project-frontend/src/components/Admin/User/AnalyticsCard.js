import {APIContext} from "../../APIContextProvider";
import {useContext, useState} from "react";
import {BASEURL} from "../../constants";
import axios from "axios";
import {DeepCloneStateSet} from "../../Utility";
import {Box, LinearProgress, Paper, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";


export function AnalyticsCard(props){
    const ctx = useContext(APIContext)
    const [compState, compSetter] = useState({
        data: null,
        axiosLoading: true,
        respReceived: false,
    })

    function setCompState(obj){
        DeepCloneStateSet(compState, obj, compSetter)
    }

    function getAnalytics(){
        const targetURL = BASEURL + "accounts/admin/analytics/"

        if (ctx.userToken === null){
            return
        }
        const token = "Token " + ctx.userToken.replace('Token ')

        var requestData = {
            url: targetURL,
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            }
        }

        axios(requestData).then(function(response){
            setCompState({
                data: response.data,
                respReceived: true,
                axiosLoading: false
            })
            if (props.onSend !== undefined || props.rerender){
                props.onSend()
            }
        }).catch(function(error){
            let a = 1
        })
    }

    function forceRerender(){
        setCompState({
            respReceived: false,
            axiosLoading: true
        })
    }

    if (props.rerender !== undefined && props.rerender){
        setCompState({
            respReceived: false,
            axiosLoading: true
        })
    }

    if (!compState.respReceived){
        getAnalytics()
    }

    if (compState.axiosLoading){
        return (
            <Paper p={2}>
                <LinearProgress/>
            </Paper>
        )
    }
    else{
        return (
            <Box
                style={{
                    justifyItems: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Paper sx={{p: 2}}>
                    <Stack spacing={2}>
                        <Typography>
                            Total Accounts: {compState.data['total_count']}
                        </Typography>
                        <Typography>
                            Admins: {compState.data['admin_count']}
                        </Typography>
                        <Typography>
                            Coaches: {compState.data['coach_count']}
                        </Typography>
                        <Typography>
                            Regulars: {compState.data['normal_count']}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        )
    }
}
