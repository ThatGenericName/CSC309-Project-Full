import {Box, Stack} from "@mui/material";
import {GymClassCard} from "./GymClassCard";
import React, {useState} from "react";

export default function GymClassList(props){

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateGymList(items){
        return (
            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <GymClassCard admin={props.admin}
                                                 data={item}
                                                 key={item.id}
                                                 onSend={props.onSend}/>)}
            </Stack>

            // <Grid2 container  direction={{xs: "column", md: "row"}}>
            //     {items.map(item => <StudioCard data={item} key={item.id}/>)}
            // </Grid2>
            // <Stack direction='column-reverse' spacing={2} alignItems='center'>
            //     {items.map(item => <AmenityCardDisplay data={item} />)}
            // </Stack>
        )
    }

    return (
        <Box
            sx={{p:2}}
            style={{maxWidth: "100%", overflow: 'auto'}}
            alignItems='center'
        >
            {generateGymList(props.items)}
        </Box>
    )
}
