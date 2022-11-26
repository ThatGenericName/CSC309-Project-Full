import React from 'react';
import InitElements from "../InitElements";
import Button from "@mui/material/Button";

export default class Subscription extends React.Component{

    render(){
        return (
            <InitElements>
                <box>

                    This is the subscription page

                    <Button href="/account">
                        Go To Accounts
                    </Button>
                </box>
            </InitElements>
        )
    }
}
