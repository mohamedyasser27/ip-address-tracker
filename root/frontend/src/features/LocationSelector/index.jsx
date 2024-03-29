import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import arrowImg from "@assets/images/icon-arrow.svg";
import "./LocationSelector.scss";
export default function LocationSelector({
  setCurrentLocationData,
  setIsLoadingResults,
}) {
  const [ipInput, setIpInput] = useState("");
  function onChange(e) {
    setIpInput(e.target.value);
  }

  async function checkInputEmptiness(requestURL) {
    if (requestURL == "") {
      const { data } = await axios(
        "https://api.ipdata.co/?api-key=8d80c879d68d26478f385c862e5e1d332821a8ef583ceb24b48c6b42"
      );
      return data.ip;
    }
    return requestURL;
  }

  async function getLocationData() {
    const requestURL = await checkInputEmptiness(ipInput);
    const { data } = await axios(
      `https://ip-address-tracker-backed.onrender.com/geolocation?requestedSiteUrl=${requestURL}`
    );
    setCurrentLocationData(data);
  }

  function onSubmit(e) {
    e.preventDefault();
    getLocationData();
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoadingResults(true);
      await getLocationData(); //load current location data on the first load
      setIsLoadingResults(false);

    }
    fetchData();
  }, []);

  return (
    <div className="location-selector">
      <p className="location-selector__header">IP Address Tracker</p>
      <form className="location-selector__form" onSubmit={onSubmit}>
        <input
          id="ip-input"
          type="text"
          name="ip"
          value={ipInput}
          onChange={onChange}
          autoComplete="off"
          placeholder="Search for any IP address or domain..."
        />
        <button className="submit-btn" aria-label="submit button">
          <img src={arrowImg} alt="" />
        </button>
      </form>
    </div>
  );
}
/**
 * TODO:error handling if backend fails
  function handleRequest(response) {
    if (response >= 400) {
      console.log("bad request switch modal");
    } else {
      let { data: currentLocationData } = response;
      setCurrentLocation(currentLocationData);
    }
  }
*/
