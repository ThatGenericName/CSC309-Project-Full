import {Paper} from "@mui/material";
import {LIPSUM} from "../constants";

export function AdminMain() {

    return (
        <Paper sx={{p: 3}}>
            {LIPSUM[0]}
        </Paper>
    )
}
