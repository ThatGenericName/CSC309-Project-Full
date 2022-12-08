import {SUBSCRIPTIONTOPCOVER} from "./PromoCardTexts";
import {Box, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";


export function TopHeader(props) {
    const data = SUBSCRIPTIONTOPCOVER

    return (
        <Box alignItems='center' textAlign='center'>
            <Grid2
                container
                alignItems="center"
                justifyItems='center'
            >
                <Grid2 xs={1}/>
                <Grid2 xs={3}>
                    <Typography variant='h2'>
                        {data['header']}
                    </Typography>
                    <Typography>
                        {data['caption1']}
                    </Typography>
                </Grid2>
                <Grid2 xs>
                </Grid2>
                <Grid2 xs={6} md={5}>
                    <img src={data.img} alt={data.header} width='100%'/>
                </Grid2>
            </Grid2>
        </Box>
    )
}
