import {Box, Card, Stack} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";


export function StudioPreview(props){
    const studioData = props.studioData

    return (
    <Card
        style={{height: '5em'}}
        variant="outlined"
        sx={{ p: 1 }}
        alignItems="center"
        component={Stack}
        direction="column"
        justifyContent="center"
    >
        <Box>
            <Box sx={{ fontWeight: 'bold', fontSize: 20}}>
                {studioData["name"]}
            </Box>
            <Box>
                {studioData['address']}
            </Box>
            <Box>
                {studioData['post_code']}
            </Box>
        </Box>

    </Card>
    )
}
