import {useLoadScript} from "@react-google-maps/api";
import {MapComp} from "./MapComp";
import {Paper} from "@mui/material";




export function MapContainer(props){
    let markers = props.markers
    let userMarker = props.userMarker

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD_gMwa1bdxfn4MWa1T3z04Gk4H4CTIi0g" // Add your API key
    });

    return (
        <Paper
            sx={{
                p:1,
                height:'100%'
            }}
        >
            {isLoaded ? <MapComp markers={markers} userMarker = {userMarker}/> : null}
        </Paper>
    )
}
