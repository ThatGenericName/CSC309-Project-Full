import {Stack} from "@mui/material";
import {AnalyticsCard} from "./AnalyticsCard";
import {UserList} from "./UserList";
import {useState} from "react";

export let rerenderQueued = false

export function UserControlPanel(props){

    const [rerender, setRerender] = useState(false)

    function forceRerender(){
        setRerender(!rerender)
    }

    function analyticsCard(){
        return <AnalyticsCard/>
    }

    return (
        <Stack spacing={2}>
            {analyticsCard()}
            <UserList onSend={forceRerender}/>
        </Stack>
    )
}
