import {Box, Chip, Paper, Stack} from "@mui/material";

import {getTimeObj} from "../TimeObject";
import SimpleTimeCard from "../SimpleTimeCard";
import React from "react";
import {StudioPreview} from "../../studios/StudioPreview";


export default function ClassCard(props){
    var data = props.classData['class_session']
    const startTime = Date.parse(data['start_time'])
    const startTimeObj = getTimeObj(startTime)
    const className = data['parent_class']['name']
    const parentClass = data['parent_class'].studio

    return (
        <Paper sx={{p:2, width: "16vw"}}>
            <Stack spacing={1}>
                <Box sx={{ fontWeight: 'bold', fontSize: 24}}>
                    {className}
                </Box>
                {props.classData['financial_hold'] && <Chip label="Financial Held" />}
                <SimpleTimeCard timeObj={startTimeObj}/>
                <StudioPreview studioData={parentClass} maxHeight='8em'/>
            </Stack>
        </Paper>
    )
}
