import {Box, Paper, Stack, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";


export function StudioPreview(props) {
    const studioData = props.studioData
    var studioLink = "/studios/" + studioData.id + "/view/"
    var name = studioData.name
    var address = studioData.address
    var postcode = studioData.post_code
    var maxHeight = props.maxHeight === undefined ? '5em' : props.maxHeight
    return (
        <Paper
            style={{maxHeight: maxHeight}}
            variant="outlined"
            sx={{p: 1}}
        >
            <Box
                component={Link}
                to={studioLink}
            >
                <Stack
                    direction="column"
                >
                    <Box sx={{fontWeight: 'bold', fontSize: 20}}>
                        {name}
                    </Box>
                    <Typography>
                        {address}
                    </Typography>
                    <Typography>
                        {postcode}
                    </Typography>
                </Stack>
            </Box>
        </Paper>
    )
}
