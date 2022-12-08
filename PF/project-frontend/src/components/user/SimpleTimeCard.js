import {Box, Card, Stack} from "@mui/material";
import React from "react";

export default function SimpleTimeCard(props) {
    let timeObj = props.timeObj

    return (
        <Card
            variant="outlined"
            justifyContent="center"
            sx={{p: 1}}>
            <Stack spacing={1}>
                <Box>
                    {timeObj.day}, {timeObj.month} {timeObj.date}
                </Box>
                <Box>
                    {timeObj.hour12}:{timeObj.minute} {timeObj.am ? "am" : "pm"}
                </Box>
            </Stack>
        </Card>
    )
}
