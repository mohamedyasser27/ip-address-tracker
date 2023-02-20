import React from "react";
import "./ResultElement.scss";
export default function ResultElement({ resultName, resultValue }) {
  return (
    <article className="result">
      <h2 className="result__name">{resultName || " "}</h2>{/* ti show  " " if api is slow */}
      <p className="result__value">{resultValue || " "}</p>
    </article>
  );
}
