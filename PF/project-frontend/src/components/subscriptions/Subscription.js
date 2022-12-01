import React from 'react';
import InitElements from "../InitElements";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";

export default class Subscription extends React.Component{

    render(){
        return (
            <InitElements>
                <Box>

                    This is the subscription page

                    <Button href="/account">
                        Go To Accounts
                    </Button>
                </Box>
            </InitElements>
        )
    }
}
