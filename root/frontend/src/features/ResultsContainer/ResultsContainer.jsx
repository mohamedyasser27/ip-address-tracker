import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ResultElement from "./components/ResultElement/ResultElement";
import downArrow from "@assets/images/down-arrow.svg";
import "./ResultsContainer.scss";
export default function ResultsContainer({ location }) {
  const [resultsClosed, setResultsClosed] = useState(true);
  const results = loadResults();
  const isBigScreen = useMediaQuery({ query: "(min-width: 730px)" });

  if (isBigScreen && !resultsClosed) {
        setResultsClosed(true);
  }
  function loadResults() {
    const list = [];
    for (const resultName in location) {
      list.push(
        <ResultElement
          key={resultName}
          resultName={resultName}
          resultValue={location[resultName]}
        />
      );
    }
    return list;
  }

  function toggleMenu() {
    setResultsClosed((prev) => !prev);
  }

  return (
    <section className={`results-container`}>
      <h1 className="results-container__header">Results</h1>
      <button
        className="close-results-btn"
        onClick={toggleMenu}
        aria-label="minimize results"
      >
        <img src={downArrow} alt="" />
      </button>
      {resultsClosed && <div className={`results-list`}>{results}</div>}
    </section>
  );
}
