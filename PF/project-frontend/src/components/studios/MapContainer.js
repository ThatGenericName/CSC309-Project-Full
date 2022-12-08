import {useLoadScript} from "@react-google-maps/api";
import {MapComp} from "./MapComp";
import {Paper} from "@mui/material";




export function MapContainer(props){
    let markers = props.markers
    let userMarker = props.userMarker

    let markers2 = []

    markers.forEach((marker) => {
        let pos = marker.position
        if (pos.lat === null || pos.lat === undefined || isNaN(pos.lat) ||
            pos.lng === null || pos.lng === undefined || isNaN(pos.lng)
        ){
            // nothing
        }
        else{
            markers2.push(marker)
        }

    })

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
            {isLoaded ? <MapComp markers={markers2} userMarker = {userMarker}/> : null}
        </Paper>
    )
}
