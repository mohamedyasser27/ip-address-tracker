import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import arrowImg from "@assets/images/icon-arrow.svg";
import "./LocationSelector.scss";
export default function LocationSelector({ setCurrentLocationData }) {
  const [ipInput, setIpInput] = useState("");
  function onChange(e) {
    setIpInput(e.target.value);
  }

  function CallApi() {
    axios(
      `https://ip-address-tracker-backed.onrender.com?requestedSiteUrl=${ipInput}`
    ).then(({ data }) => {
      setCurrentLocationData(data);
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    CallApi();
  }

  useEffect(() => {
      CallApi()
  }, []);

  return (
    <div className="location-selector">
      <p className="location-selector__header">IP Address Tracker</p>
      <form className="location-selector__form"  onSubmit={onSubmit}>
        <input
          id="ip-input"
          type="text"
          name="ip"
          value={ipInput}
          onChange={onChange}
          autoComplete="off"
          placeholder="Search for any IP address or domain..."
        />
        <button className="submit-btn">
          <img src={arrowImg} />
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
