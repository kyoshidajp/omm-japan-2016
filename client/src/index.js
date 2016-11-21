import React from 'react';
import ReactDOM from 'react-dom';
import AsyncGettingStartedExample from "./AsyncGettingStartedExample";

ReactDOM.render(
  <AsyncGettingStartedExample
    url="/api/v1/controls.json"
    resultsUrl="/api/v1/results.json"
    />,
  document.getElementById("container")
);
