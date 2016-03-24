require("html!../index.html");
require("../styles/index.less");
require("font-awesome-webpack");

import React, {Component} from "react";
import PitchReadingView from "./views/pitch_reading_view";
import RhythmReadingView from "./views/rhythm_reading_view";
import StatisticService from "./services/statistic_service.js";
import AppFreezer from "./AppFreezer.js";

const pianoBackgroundJpg = require("file!../images/piano-background.jpg");
const githubPng = require("file!../images/github.png");


export default class App extends Component {
  render() {
    const state = AppFreezer.get();

    const isPitchGame = false;

    const activeGame = isPitchGame ?
      <PitchReadingView
       statisticService={StatisticService}
       settings={state.settings.pitchReading}
      /> :
      <RhythmReadingView
       settings={state.settings.rhythmReading}
      />;

    return (
      <div>
        <img id="image-background" src={pianoBackgroundJpg} />

        <div className="jumbotron">
          <h1>Piano Trainer</h1>
          <a href="https://github.com/philippotto/Piano-Trainer">
            <img id="github" src={githubPng} />
          </a>
        </div>

        <div className="too-small">
          <div className="message">
            <p>
              {`
                This page is meant to be viewed on a sufficiently large screen
                with a MIDI enabled device connected.
              `}
              {"If you are interested to learn more about Piano-Trainer, view"}
              <a href="http://github.com/philippotto/Piano-Trainer">this page.</a>
            </p>
          </div>
        </div>
        {activeGame}
      </div>
    );
  }

  componentDidMount() {
    AppFreezer.on('update', () => this.forceUpdate());
  }
}
