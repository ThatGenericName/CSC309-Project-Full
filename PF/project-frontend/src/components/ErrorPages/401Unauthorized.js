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


export function Unauthorized401(props) {

    function suggestion() {
        if (props.suggestions === undefined || props.suggestions === null) {
            return (
                <Stack spacing={2}>
                    <Typography variant='h5'>
                        Sorry, you're not allowed to access page
                    </Typography>
                    <Typography variant='h5'>
                        Try these places
                    </Typography>
                    {BASELINKS.map(({name, url}) =>
                        <Button
                            variant='contained'
                            component={Link}
                            to={url}
                        >
                            {name}
                        </Button>
                    )}
                </Stack>
            )
        } else {
            return (
                <Stack spacing={2}>
                    <Typography variant='h5'>
                        Sorry, you're not allowed access page
                    </Typography>
                    <Button
                        variant='outlined'
                        component={Link}
                        to={'/'}
                    >
                        Go Home
                    </Button>
                    <Typography variant='h5'>
                        Try these places instead
                    </Typography>
                    {props.suggestions.map(({name, url}) =>
                        <Button
                            variant='contained'
                            component={Link}
                            to={url}
                        >
                            {name}
                        </Button>
                    )}
                </Stack>
            )
        }
    }

    return (
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
            sx={{p: 2}}
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
                    400 Unauthorized
                </Typography>
                <Paper sx={{m: 3, p: 2}}>
                    {suggestion()}
                </Paper>
            </Stack>
        </Box>

    )
}
