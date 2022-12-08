import React from 'react';
import {Box, Button, Paper, Stack, Typography} from "@mui/material";

import Image from "./LandingBanner2.png"
import Grid2 from "@mui/material/Unstable_Grid2";
import {Link} from "react-router-dom";
import {Searchredirect} from "./searchredirect";

export default class Landing extends React.Component{

    render(){
        return (
            <Box>
                <Box
                    sx={{
                        backgroundImage: `url(${Image})`,
                        "background-position": 'center',
                        p:3,
                        py:15
                    }}
                    style={{
                        alignItems: 'right',
                        alignContent: 'right',
                        textAlign: 'right'
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 256,
                        }}
                        alt="logo."
                        src="/tfc.png"
                    />
                </Box>
                <Box
                    sx={{
                        p:2,
                        height: "5vh"
                    }}
                    style={{
                        textAlign: 'center',
                        backgroundColor: '#fd6114'
                    }}
                >
                    <Typography
                        variant='h4'
                        style={{color: '#ffffff'}}
                    >
                        CREATE YOUR BEST LIFE
                    </Typography>
                </Box>
                <Stack>
                    <Paper
                        sx={{
                            p:2,
                            m:2
                        }}
                        style={{
                            alignItems: 'right',
                            alignContent: 'right',
                            textAlign: 'Center'
                        }}
                    >
                        <Grid2 container spacing={3}>
                            <Grid2 xs={4}>
                                <Button
                                    variant='outlined'
                                    size="large"
                                    component={Link}
                                    to='/studios'
                                >
                                    Studios
                                </Button>
                            </Grid2>
                            <Grid2 xs={4}>
                                <Button
                                    variant='contained'
                                    size="large"
                                    component={Link}
                                    to='/account'
                                >
                                    Join Now
                                </Button>
                            </Grid2>
                            <Grid2 xs={4}>
                                <Button
                                    variant='outlined'
                                    size="large"
                                    component={Link}
                                    to='/subscriptions'
                                >
                                    Memberships
                                </Button>
                            </Grid2>
                            <Searchredirect/>
                        </Grid2>
                    </Paper>
                </Stack>
            </Box>
        )
    }
}
