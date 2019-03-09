import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Timer control component. Props - type(session, break), length(session length), setLength( function that relates increments back to main component)
const TimerSet = ({ type, length, setLength }) => {
  return (
    <div className="timerSet">
      <h2 id={`${type}-label`}>{`${type} Length`}</h2>
      <div className="timerSet-buttons">
        <button id={`${type}-decrement`} onClick={() => setLength(type, false)}>
          <FontAwesomeIcon className="icon" icon="arrow-down" />
        </button>
        <h2 id={`${type}-length`}>{length}</h2>
        <button id={`${type}-increment`} onClick={() => setLength(type, true)}>
          <FontAwesomeIcon className="icon" icon="arrow-up" />
        </button>
      </div>
    </div>
  );
};

export default TimerSet;
