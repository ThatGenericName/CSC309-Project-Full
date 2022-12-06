import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF
} from "@react-google-maps/api";


export function MapComp(props) {

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
    map.fitBounds(bounds);
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
