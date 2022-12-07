import {Alert, Box, Snackbar, Stack} from "@mui/material";
import {GymClassScheduleCard} from "./GymClassScheduleCard";
import React, {useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function GymClassScheduleList(props){

    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = props.items.slice(indexOfFirstRecord, indexOfLastRecord);


    function generateGymList(items){
        return (
            <Stack direction='column' spacing={2} alignItems='center'>
                {items.map(item => <GymClassScheduleCard data={item} key={item.id}/>)}
            </Stack>
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
