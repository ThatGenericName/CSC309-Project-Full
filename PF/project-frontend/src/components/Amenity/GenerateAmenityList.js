import {Box, Stack} from "@mui/material";
import {AmenityCardDisplay} from "./AmenityCardDisplay";
import React, {useState} from "react";

export default function AmenityList(props) {

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateAmenityList(items) {
        return (

            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <AmenityCardDisplay data={item}
                                                       key={item.id}
                                                       admin={props.admin}
                                                       onSend={props.onSend}/>)}
            </Stack>
            // <Stack direction='column-reverse' spacing={2} alignItems='center'>
            //     {items.map(item => <AmenityCardDisplay data={item} />)}
            // </Stack>
        )
    }

    const vertical = 'bottom'
    const horizontal = 'center';

    return (
        <Box
            sx={{p: 2}}
            style={{maxWidth: "100%", overflow: 'auto'}}
            alignItems='center'
        >
            {generateAmenityList(props.items)}
        </Box>
    )
}
