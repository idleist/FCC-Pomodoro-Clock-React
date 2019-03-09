import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Timer = ({ timer, counter, running, playPauseTimer, resetTimer }) => {
  return (
    <div>
      <div id="timer">
        <h2 id="timer-label">{timer}</h2>
        <h2 id="time-left">{counter}</h2>
      </div>
      <div id="timerControls">
        <button id="start_stop" onClick={playPauseTimer}>
          {running ? (
            <FontAwesomeIcon className="icon" icon="pause-circle" />
          ) : (
            <FontAwesomeIcon className="icon" icon="play-circle" />
          )}
        </button>
        <button id="reset" onClick={resetTimer}>
          <FontAwesomeIcon className="icon" icon="redo" />
        </button>
      </div>
    </div>
  );
};

export default Timer;
