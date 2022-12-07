import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF
} from "@react-google-maps/api";


const initLoadMarkers =[
  {
    id: -1,
    name: "LoadMarker1",
    position: {lat: 43.663512334791974, lng: -79.39285877084677}
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
    markers.forEach(({ position }) => bounds.extend(position));
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
    markers.forEach(({ position }) => bounds.extend(position));
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
