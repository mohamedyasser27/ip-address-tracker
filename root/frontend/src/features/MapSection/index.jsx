import React, { useEffect, useRef } from "react";
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import { fixLeafletIcons } from "@src/fixLeafletIcons";
import "./MapSection.scss";

export default function MapSection({ lat, lng }) {
  let mapRef = useRef(null);

  useEffect(() => {
    fixLeafletIcons();//common fix for leaflet icon problems,reproduce by removal
  }, []);

  useEffect(() => {
    if (mapRef.current != null) {
      mapRef.current.setView([lat, lng]);
    }
  }, [lat]); //change api when api is called

  return (
    <>
      {lat!=null && (
        <MapContainer
          ref={mapRef}
          id="map"
          center={[lat, lng]}
          zoom={60}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[lat, lng]}></Marker>
        </MapContainer>
      )}
    </>
  );
}
