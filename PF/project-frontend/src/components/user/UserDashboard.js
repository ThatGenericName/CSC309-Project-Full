import React from 'react';
import InitElements from "../InitElements";
import Button from "@mui/material/Button";

export default class UserDashboard extends React.Component{

    render(){
        return (
            <InitElements>
                <box>

                    This is the user dashboard page

                    <Button href="/subscription">
                        Go To Subscriptions
                    </Button>

                </box>
            </InitElements>
        )
    }
}
