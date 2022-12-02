import {Box, ButtonGroup, Card} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SimpleTimeCard from "./SimpleTimeCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {StudioPreview} from "../studios/StudioPreview";
import CoachPreview from "./CoachPreview";
import React from "react";
import {getTimeObj} from "./TimeObject";
import Button from "@mui/material/Button";
import DropClassButton from "./userclass/DropClassButton";


export function ClassSessionPreview(classData){
    var data = classData.classData
    var startTime = Date.parse(data['start_time'])
    var endTime = Date.parse(data['end_time'])

    var startTimeObj = getTimeObj(startTime)
    var endTimeObj = getTimeObj(endTime)

    return (
        <Card sx={{p: 1}} variant="outlined">
            <Grid2
                container
                columns={24}
                rowSpacing={1}
                columnSpacing={1}
                alignItems="center"
                justifyContent='center'
            >
                <Grid2 xs={8}>
                    <Box sx={{ fontWeight: 'bold', fontSize: 24}}>
                        {data['parent_class']['name']}
                    </Box>
                </Grid2>
                <Grid2 xs={2}/>
                <Grid2 xs={12}>
                    <DropClassButton/>
                </Grid2>
                <Grid2 xs={2}>
                    {data['enrollment_count']}/{data['enrollment_capacity']}
                </Grid2>
                <Grid2 xs={5}>
                    <SimpleTimeCard timeObj={startTimeObj}/>
                </Grid2>
                <Grid2 xs={1}>
                    <ArrowRightAltIcon/>
                </Grid2>
                <Grid2 xs={5}>
                    <SimpleTimeCard timeObj={endTimeObj}/>
                </Grid2>
                <Grid2 xs={6}>
                    <StudioPreview studioData={data['parent_class']['studio']}/>
                </Grid2>
                <Grid2 xs>
                    <CoachPreview coachData={data['coach']}/>
                </Grid2>
            </Grid2>
        </Card>
    )
}
