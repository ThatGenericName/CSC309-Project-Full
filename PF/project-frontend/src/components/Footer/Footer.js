import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const textColor = '#bfbfbf'

export function Footer(props){

    return (
        <AppBar
            position="static"
            color="footer"
            sx={{ top: 'auto', bottom: 0 }}
            style={{
                zIndex: 1400
            }}
        >
            <Toolbar
                sx={{p:3}}
            >
                <Grid2
                    container
                    sx={{
                        fontSize: 15,
                        color: textColor,
                        width: "100%"
                }}

                >
                    <Grid2 xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ fontWeight: 'bold' }}>
                                Home
                            </Box>
                            <Box>
                                <Link
                                    to={"/"}
                                    style={{
                                        color: textColor,
                                        textDecoration: 'none'
                                    }}
                                >
                                    TorontoFitnessClub.ca
                                </Link>
                            </Box>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ fontWeight: 'bold' }}>
                                Get Started
                            </Box>
                            <Box>
                                <Link
                                    to={"/studios/"}
                                    style={{
                                        color: textColor,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Find a studio near you
                                </Link>
                            </Box>
                            <Box>
                                <Link
                                    to={"/subscriptions/"}
                                    style={{
                                        color: textColor,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Memberships
                                </Link>
                            </Box>
                            <Box>
                                <Link
                                    to={"/account/"}
                                    style={{
                                        color: textColor,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Account Center
                                </Link>
                            </Box>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ fontWeight: 'bold' }}>
                                Company
                            </Box>
                            <Box>
                                Press
                            </Box>
                            <Box>
                                Careers
                            </Box>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ fontWeight: 'bold' }}>
                                Policy
                            </Box>
                            <Box>
                                Terms & Conditions
                            </Box>
                            <Box>
                                Privacy Policy
                            </Box>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Toolbar>
        </AppBar>
    )
}
