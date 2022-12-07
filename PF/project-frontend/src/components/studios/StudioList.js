import {Alert, Box, Snackbar, Stack} from "@mui/material";
import {StudioCard} from "./StudioCard";
import React, {useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function StudioList(props){

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateStudioList(items){
        return (
            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <StudioCard data={item} key={item.id}/>)}
            </Stack>

            // <Grid2 container  direction={{xs: "column", md: "row"}}>
            //     {items.map(item => <StudioCard data={item} key={item.id}/>)}
            // </Grid2>
            // <Stack direction='column-reverse' spacing={2} alignItems='center'>
            //     {items.map(item => <AmenityCardDisplay data={item} />)}
            // </Stack>
        )
    }

    const vertical = 'bottom'
    const horizontal = 'center';

    return (
        <Box
            sx={{p:2}}
            style={{maxWidth: "100%", overflow: 'auto'}}
            alignItems='center'
        >
            {generateStudioList(props.items)}
            {/*<Snackbar*/}
            {/*    anchorOrigin={{ vertical, horizontal }}*/}
            {/*    autoHideDuration={8000}*/}
            {/*    open={snackbarOpen}*/}
            {/*    onClose={() => setSnackbarOpen(false)}*/}
            {/*>*/}
            {/*    <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>*/}
            {/*        Success!*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
        </Box>
    )
}
