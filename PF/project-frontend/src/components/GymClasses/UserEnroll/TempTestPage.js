import {Box, Paper} from "@mui/material";
import {EnrollUserInSession} from "./EnrollUserInSessionButton";
import {EnrollUserInClassButton} from "./EnrollUserInClassButton";


export function TempTestPage(props){

    return (
        <Box
            style={{
                textAlign: 'center'
            }}
        >
            <Paper
                sx={{
                    p:5,
                    m:5
                }}
            >
                <EnrollUserInSession
                    sessionID={3}
                    className='TestClass'
                />
                <EnrollUserInClassButton
                    classID={1}
                    className='TestClass'
                />
            </Paper>
        </Box>
    )
}
