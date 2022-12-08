import {Paper, Stack, Typography} from "@mui/material";
import {LIPSUM} from "../constants";
import {useContext} from "react";
import {APIContext} from "../APIContextProvider";

export function AdminMain() {
    const ctx = useContext(APIContext)

    let un = "Admin"
    if (ctx.userData.username !== null){
        un = ctx.userData.username
    }


    return (
        <Paper
            sx={{
                p: 3,
                textAlign: 'center'
            }}

        >

            <Stack spacing={3}>
                <Typography variant='h5'>
                    Hello {un}
                </Typography>
                <Typography>
                    This is the admin control page, this is where you can manage the website.
                </Typography>
            </Stack>
        </Paper>
    )
}
