import React from "react";
import "./summary.css";
export default function Summary() {
  return (
    <>
      <div className="summary-wrap" id="summary">
        <h1>FAQ'S</h1>
        <div className="summary-content">
          <details>
            <summary>How Quick does the food get delivered!</summary>
            <p>30-min </p>
          </details>
          <details>
            <summary>Are they fresh!</summary>
            <p>yes </p>
          </details>
          <details>
            <summary>Replacement is available !</summary>
            <p>Nope </p>
          </details>
          {/* <details>
            <summary>Know About US!</summary>
            <p>Poda </p>
          </details>
          <details>
            <summary>Know About US!</summary>
            <p>Poda </p>
          </details> */}
        </div>
      </div>
    </>
  );
}
