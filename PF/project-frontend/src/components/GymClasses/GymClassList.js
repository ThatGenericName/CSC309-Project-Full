import {Alert, Box, Snackbar, Stack} from "@mui/material";
import {GymClassCard} from "./GymClassCard";
import React, {useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function GymClassList(props){

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateGymList(items){
        return (
            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <GymClassCard data={item} key={item.id}/>)}
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
