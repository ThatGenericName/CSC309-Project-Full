import {Box, ButtonGroup, Card, Chip} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SimpleTimeCard from "../SimpleTimeCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {StudioPreview} from "../../studios/StudioPreview";
import CoachPreview from "./CoachPreview";
import React from "react";
import {getTimeObj} from "../TimeObject";
import Button from "@mui/material/Button";
import DropClassButton from "./DropClassButton";


export function ClassSessionPreview(props){
    var classData = props.classData['class_session']
    var startTime = Date.parse(classData['start_time'])
    var endTime = Date.parse(classData['end_time'])

    var startTimeObj = getTimeObj(startTime)
    var endTimeObj = getTimeObj(endTime)

    var sessionID = classData['id']
    var classID = classData['parent_class']['id']

    var now = Date.now()

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
                <Grid2 xs={5}>
                    <Box sx={{ fontWeight: 'bold', fontSize: 24}}>
                        {classData['parent_class']['name']}
                    </Box>
                </Grid2>
                <Grid2 xs={3}>
                    {props.classData['dropped'] && <Chip label="Dropped" />}
                </Grid2>
                <Grid2 xs={4}>
                    {props.classData['financial_hold'] && <Chip label="Financial Held" />}
                </Grid2>
                <Grid2 xs={10}>
                    <DropClassButton
                        data={props.classData}
                        classID={classID}
                        sessionID={sessionID}
                        filterSetter={props.filterSetter}
                    />
                </Grid2>
                <Grid2 xs={2}>
                    {classData['enrollment_count']}/{classData['enrollment_capacity']}
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
                    <StudioPreview studioData={classData['parent_class']['studio']}/>
                </Grid2>
                <Grid2 xs>
                    <CoachPreview coachData={classData['coach']}/>
                </Grid2>
            </Grid2>
        </Card>
    )
}
