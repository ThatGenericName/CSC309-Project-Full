import Grid2 from "@mui/material/Unstable_Grid2";
import {Paper, Stack, Typography} from "@mui/material";
import React from "react";

export function PromoCardItem(props) {

    const data = props.data

    var imgGrid = (
        <Grid2 xs={4}>
            <img src={data.img} alt={data.header} width='100%'/>
        </Grid2>
    )

    var textGrid = (
        <Grid2 xs>
            <Stack>
                <Typography variant='h3'>{data.header}</Typography>
                <Typography>{data.text}</Typography>
            </Stack>
        </Grid2>
    )

    return (
        <Paper sx={{px: 3, py: 0}} style={{textAlign: 'center'}}>
            <Grid2 container alignItems="center">
                {props.left ? imgGrid : textGrid}
                <Grid2 xs={1}/>
                {props.left ? textGrid : imgGrid}
            </Grid2>
        </Paper>
    )
}
