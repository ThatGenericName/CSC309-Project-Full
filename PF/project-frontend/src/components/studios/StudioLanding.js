import {Box, Paper} from "@mui/material";
import {MapComp} from "./MapComp";
import {MapContainer} from "./MapContainer";
import Grid2 from "@mui/material/Unstable_Grid2";


const markers = [
    {
        id: 1,
        name: "Marker 1",
        position: { lat: 43.66875683889016, lng: -79.38825693508332 }
    },
    {
        id: 2,
        name: "Marker 2",
        position: { lat: 43.66748375905699, lng: -79.39928645921668 }
    },
    {
        id: 3,
        name: "Marker 3",
        position: { lat: 43.658170528434795, lng: -79.39533766262096 }
    }
];

const userMarker =
    {
        id: 0,
        name: "You",
        position: { lat: 43.66464011762419, lng: -79.38994037013866 }
    }


export function StudiosLanding(){

    return (
        <Box
            sx={{
                height:"100vh"
            }}
        >
            <Grid2
                container
                sx={{
                    height:"50%",
                    p:2
                }}
                spacing={1}
            >
                <Grid2 xs={3}>
                    <Paper
                        sx={{
                            height:"100%",
                            p: 1
                        }}
                    >
                        Text
                    </Paper>
                </Grid2>
                <Grid2 xs>
                    <Box
                        sx={{
                            height: "100%"
                        }}
                    >
                        <MapContainer markers={markers} userMarker={userMarker}/>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}
