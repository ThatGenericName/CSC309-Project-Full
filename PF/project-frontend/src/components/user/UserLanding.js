import React from 'react';
import InitElements from "../InitElements";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Box} from "@mui/material";
import DashboardMenu from "./DashboardMenu";
import {APIContext} from "../APIContextProvider";
import {BASEURL} from "../constants";
import axios from "axios";

export default class UserLanding extends React.Component{
    static contextType = APIContext
    constructor(props, context) {
        super(props, context);
        this.state = {
            menuOpened: false,
            reqSent: false,
            reqRec: false,
            tokenChecked: false,
            userData: null
        }
    }

    componentDidMount(){
        if (this.context.userLoggedIn){
            // skip the below
        }
        else{
            let token = localStorage.getItem('Auth')

            if (token === null){
                this.setState({tokenChecked: true})
                return
            }
            let targetURL = BASEURL + 'accounts/view/'
            let tokenStr = 'Token ' + token.split(' ')[1]
            let requestData = {
                url: targetURL,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenStr
                }
            }

            let comp = this
            this.setState({reqSent: true})
            axios(requestData)
                .then(function (response){
                    comp.setState({userData: response.data, reqRec: true})
                })
                .catch(function (error){
                    comp.setState({userData: null, reqReq: true})
                })
        }
    }


    setMenuOpened(val){
        this.setState({menuOpened: val})
    }

    showUnauthorized(){
        return (
            <InitElements>
                <div>Please Log In</div>
            </InitElements>
        )
    }

    loggedInDisplay(){
        let p = {
            menuOpened: this.state.menuOpened,
            setMenuOpened: this.setMenuOpened
        }
        let userData = this.context.userData.fullUserData
        return (
            <Grid2 p={2} container spacing={2}>
                <Grid2 item style={{width: "300px"}}>
                    <DashboardMenu menuOpened={p} userData={userData}></DashboardMenu>
                </Grid2>
                <Grid2 xs>
                    <Paper>xs=4</Paper>
                </Grid2>
            </Grid2>)
    }

    render(){
        let display
        if (this.context.userLoggedIn && this.context.userData.fullUserData != null){
            display = this.loggedInDisplay()
        }
        else{
            display = this.showUnauthorized()
        }


        return (
            <InitElements>
                <Box>
                    This is the user dashboard page
                    <Button href="/subscription">
                        Go To Subscriptions
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    {display}
                </Box>
            </InitElements>
        )
    }
}
