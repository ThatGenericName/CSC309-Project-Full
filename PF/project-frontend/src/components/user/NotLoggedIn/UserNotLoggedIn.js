import Grid2 from "@mui/material/Unstable_Grid2";
import {LogIn} from "./LogIn";
import {Box, Paper} from "@mui/material";
import {Register} from "./Register";


export function UserNotLoggedIn(props){

    return (
        <Box
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
        >
            <Paper
                sx={{m:3, p:2}}
            >
                <Grid2 container spacing={2}>
                    <Grid2 xs={1}/>
                    <Grid2 xs={5}>
                        <Register/>
                    </Grid2>
                    <Grid2 xs={5}>
                        <LogIn/>
                    </Grid2>
                    <Grid2 xs={1}/>
                </Grid2>
            </Paper>
        </Box>

    )
}
