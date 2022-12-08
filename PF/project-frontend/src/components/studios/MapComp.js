import React, {useState} from "react";
import {GoogleMap, InfoWindowF, MarkerF} from "@react-google-maps/api";


const CENTERING_MARKERS = [
    {
        id: -1,
        name: 'CM1',
        position: {
            lat: 43.66667146506163, lng: -79.40372604585576
        }
    },
    {
        id: -2,
        name: 'CM2',
        position: {
           lat: 43.6536563253411, lng: -79.37361534607086
        }
    }
]


export function MapComp(props) {

  const [map, setMap] = useState(null)

  var markers = props.markers
  if (markers === undefined){
    markers = []
  }

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds()
    if (markers.length === 0){
      CENTERING_MARKERS.forEach(({ position }) => bounds.extend(position));
    }
    else{
      markers.forEach(({ position }) => bounds.extend(position));
    }
    if (props.userMarker !== undefined && props.userMarker !== null){
      bounds.extend(props.userMarker)
    }
    map.fitBounds(bounds);
    setMap(map)
  };

  function CreateMarker(id, name, position, icon){
    return (
      <MarkerF
          key={id}
          position={position}
          icon={icon === undefined || icon === null ? null : icon}
          onClick={() => handleActiveMarker(id)}
      >
          {activeMarker === id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
              </InfoWindowF>
          ) : null}
      </MarkerF>
    )
  }

  let um = props.userMarker

  function remapBounds(){
    const bounds = new window.google.maps.LatLngBounds()
    if (markers.length === 0){
      CENTERING_MARKERS.forEach(({ position }) => bounds.extend(position));
    }
    else{
      markers.forEach(({ position }) => bounds.extend(position));
    }
    if (props.userMarker !== undefined && props.userMarker !== null){
      bounds.extend(props.userMarker.position)
    }
    map.fitBounds(bounds);
  }

  if (map !== null){
    remapBounds()
  }

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      {markers.map(({id, name, position}) => CreateMarker(id, name, position))}
      {(um !== undefined  && um !== null)  ? CreateMarker(um.id, um.name, um.position, '/UserMapIcon.png') : null}
    </GoogleMap>
  );
}
