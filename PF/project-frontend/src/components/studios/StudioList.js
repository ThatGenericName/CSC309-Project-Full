import {Box, Stack} from "@mui/material";
import {StudioCard} from "./StudioCard";
import React, {useState} from "react";

export default function StudioList(props) {

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateStudioList(items) {
        return (
            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <StudioCard data={item} admin={props.admin}
                                               key={item.id} onSend={props.onSend}/>)}
            </Stack>

        )
    }

    return (
        <Box
            sx={{p: 2}}
            style={{maxWidth: "100%", overflow: 'auto'}}
            alignItems='center'
        >
            {generateStudioList(props.items)}

        </Box>
    )
}
