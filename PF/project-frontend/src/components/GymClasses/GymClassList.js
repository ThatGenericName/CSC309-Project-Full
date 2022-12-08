import {Box, Stack} from "@mui/material";
import {GymClassCard} from "./GymClassCard";
import React, {useState} from "react";

export default function GymClassList(props) {

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateGymList(items) {
        return (
            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <GymClassCard admin={props.admin}
                                                 data={item}
                                                 key={item.id}
                                                 onSend={props.onSend}/>)}
            </Stack>
        )
    }

    return (
        <Box
            sx={{p: 2}}
            style={{maxWidth: "100%", overflow: 'auto'}}
            alignItems='center'
        >
            {generateGymList(props.items)}
        </Box>
    )
}
