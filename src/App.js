import React, { Component } from "react";
import "./App.css";
import Timer from "./Timer";
import TimerSet from "./TimerSet";
import moment from "moment";
import beep from "./assets/alarm_beep.wav";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPauseCircle,
  faPlayCircle,
  faRedo
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowUp, faArrowDown, faPauseCircle, faPlayCircle, faRedo);

const Title = () => {
  return (
    <div id="title">
      <h1>FCC Pomodoro Clock</h1>
      <h3>
        This is part of the Front End Libraries certificate for FreeCodeCamp
      </h3>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      counter: 25 * 60 * 1000,
      running: false,
      currentTimer: "Session"
    };
  }

  // timer - session or break, increment - boolean
  setLength = (type, increment) => {
    clearInterval(this.startTime);

    if (this.state[`${type}Length`] <= 1 && !increment) {
      return;
    }
    if (this.state[`${type}Length`] >= 60 && increment) {
      return;
    }

    let count =
      type === "session"
        ? (this.state.sessionLength + (increment ? 1 : -1)) * 60 * 1000
        : this.state.sessionLength * 60 * 1000;

    this.setState({
      [`${type}Length`]: this.state[`${type}Length`] + (increment ? 1 : -1),
      counter: count,
      currentTimer: "Session",
      running: false
    });
  };

  resetTimer = () => {
    this.clip = document.getElementById("beep");
    this.clip.pause();
    this.clip.currentTime = 0;
    clearInterval(this.startTime);
    this.setState({
      running: false,
      breakLength: 5,
      sessionLength: 25,
      counter: 25 * 60 * 1000,
      currentTimer: "Session"
    });
  };

  playPauseTimer = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.startTime = setInterval(() => {
        if (this.state.counter > 0) {
          this.setState({
            counter: this.state.counter - 1000
          });
        } else {
          this.clip = document.getElementById("beep");
          this.clip.play();
          this.setState({
            currentTimer:
              this.state.currentTimer === "Session" ? "Break" : "Session",
            counter:
              this.state.currentTimer === "Session"
                ? this.state.breakLength * 60 * 1000
                : this.state.sessionLength * 60 * 1000
          });
        }
      }, 1000);
    } else {
      clearInterval(this.startTime);
      this.setState({ running: false });
    }
  };
  render() {
    return (
      <div id="timerContainer">
        <Title />
        <div id="timerSet">
          <TimerSet
            type="break"
            setLength={this.setLength}
            length={this.state.breakLength}
          />
          <TimerSet
            type="session"
            setLength={this.setLength}
            length={this.state.sessionLength}
          />
        </div>
        <Timer
          timer={this.state.currentTimer}
          counter={moment(this.state.counter).format("mm:ss")}
          running={this.state.running}
          resetTimer={this.resetTimer}
          playPauseTimer={this.playPauseTimer}
        />
        <audio id="beep" src={beep} />
      </div>
    );
  }
}

export default App;
