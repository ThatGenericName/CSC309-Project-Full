import {Box, Card, CardContent, Paper, Stack, Typography} from "@mui/material";



import {getTimeObj} from "../TimeObject";
import SimpleTimeCard from "../SimpleTimeCard";
import React from "react";
import {StudioPreview} from "../../studios/StudioPreview";
import Grid2 from "@mui/material/Unstable_Grid2";


export default function ClassCard(props){
    var data = props.classData
    const startTime = Date.parse(data['start_time'])
    const startTimeObj = getTimeObj(startTime)
    const className = data['parent_class']['name']

    return (
        <Paper sx={{p:2}}>
            <Stack spacing={1}>
                <Box sx={{ fontWeight: 'bold', fontSize: 24}}>
                    {className}
                </Box>
                <SimpleTimeCard timeObj={startTimeObj}/>
                <StudioPreview studioData={{
                    "name": "Test",
                    "address": "310 Bloor Street W",
                    'post_code': 'M5S1W4'
                    }}
                />
            </Stack>
        </Paper>
    )
}
