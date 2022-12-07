import {Button, ButtonBase, Paper, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";

const BASELINKS = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Studios',
        url: '/studios'
    },
    {
        name: 'Classes',
        url: '/classes'
    },
    {
        name: 'Account',
        url: '/account'
    }
]


export function InternalServerError500(props){

    return (
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
            sx={{p:2}}
        >
            <Stack spacing={2}>
                <Box>
                    <ButtonBase
                        component={Link}
                        to={'/'}
                    >
                        <Box
                            component="img"
                            sx={{
                            height: 256,
                            }}
                            alt="logo."
                            src="/tfc.png"
                        />
                    </ButtonBase>
                </Box>
                <Typography variant='h3'>
                    500 Internal Server Error
                </Typography>
                <Paper sx={{m:3, p:2}}>
                    <Stack spacing={2}>
                        <Typography variant='h5'>
                            Something happened with our end, we are working to solve it
                        </Typography>
                        <Typography variant='h5'>
                            Please try again later
                        </Typography>
                        <Button
                            variant='outlined'
                            component={Link}
                            to={'/'}
                        >
                            Go Home
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </Box>

    )
}
