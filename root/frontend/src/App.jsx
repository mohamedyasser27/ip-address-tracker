import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImg from "@assets/images/pattern-bg.png";
import LocationSelector from "@features/LocationSelector/";
import ResultsContainer from "./features/ResultsContainer/ResultsContainer";
import MapSection from "@features/MapSection/";
import "@assets/scss/global.scss";

export default function App() {
  const [currentLocationData, setCurrentLocationData] = useState({});
  const {
    isp = null,
    ip = null,
    location: {
      lat = null,
      lng = null,
      city = null,
      country = null,
      timezone = null,
    } = {}, // we can't destructure undefined so i gave it a default
  } = currentLocationData;

  return (
    <main>
      <img className="background-img" src={backgroundImg} alt="background img" />
      <MapSection lat={lat} lng={lng} />

      <div className="absolute-container">
        <LocationSelector setCurrentLocationData={setCurrentLocationData} />
        <ResultsContainer
          location={{
            "ip Address": ip,
            location: city == null ? null : `${city},${country}`, //to pass null instead of "null,null"
            timezone,
            isp,
          }}
        />
      </div>
    </main>
  );
}
