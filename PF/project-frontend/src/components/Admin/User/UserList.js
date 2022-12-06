import react from "react";
import {APIContext} from "../../APIContextProvider";
import {BASEURL} from "../../constants";
import axios from "axios";
import {Box, Pagination, Paper, Stack} from "@mui/material";
import {UserDetailsCard} from "./UserDetailsCard";


export class UserList extends react.Component{

    static contextType = APIContext

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            pages: 0,
            targetPage: 1,
            axiosLoading: true,
            respReceived: false,
            filter: ""
        }
    }

    forceRender(comp){
        comp.setState({respReceived: false})
        if (comp.props.onSend !== undefined){
            comp.props.onSend()
        }
    }

    getData(){
        const targetURL = BASEURL + "accounts/admin/allusers/"
        if (this.context.userToken === null){
            return
        }
        const token = "Token " + this.context.userToken.replace("Token ")

        const reqDat = {
            url: targetURL,
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            },
            params: {
                page: this.state.targetPage,
                filter: this.state.filter
            }
        }

        const comp = this

        axios(reqDat).then(function(response){
            comp.setState({
                data: response.data['results'],
                pages: Math.ceil(response.data['count'] / 10),
                axiosLoading: false,
                respReceived: true
            })
        }).catch(function(error){
            let a = 1
        })
    }

    generateList(){

        return (
            <Stack spacing={3}>
                {this.state.data.map(item =>
                    <UserDetailsCard
                        data={item}
                        key={"user_"+item['id']}
                        onSend={() => this.forceRender(this)}
                    />
                )}
            </Stack>
        )
    }

    render(){
        if (!this.state.respReceived){
            this.getData()
        }
        const comp = this
        return (
            <Box>
                <Paper sx={{p:3}}>
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Pagination
                            count={this.state.pages}
                            onChange={(e, v) => {
                                if (v !== comp.state.targetPage){
                                    comp.setState({
                                        targetPage: v,
                                        axiosLoading: true,
                                        respReceived: false
                                    })
                                }
                            }}
                        />
                    </Box>
                    {this.generateList()}
                </Paper>
            </Box>
        )
    }
}




