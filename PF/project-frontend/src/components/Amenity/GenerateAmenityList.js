import {Alert, Box, Snackbar, Stack} from "@mui/material";
import {AmenityCardDisplay} from "./AmenityCardDisplay";
import React, {useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function AmenityList(props){

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function generateAmenityList(items){
        return (

            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <AmenityCardDisplay data={item} key={item.id}/>)}
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
            sx={{p:2}}
            style={{maxWidth: "100%", overflow: 'auto'}}
            alignItems='center'
        >
            {generateAmenityList(props.items)}
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
