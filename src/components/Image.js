import React, { Component } from "react";
import PropTypes from "prop-types";
import paper from "paper";
import { prop } from "ramda";
import download from "downloadjs";
import * as record from "utils/record";
import * as compare from "../compare";
import PixelSorter from "../PixelSorter";
import * as exchange from "sort/exchange";
import {
  BOGO,
  SELECTION,
  CYCLE,
  INSERTION,
  BUBBLE,
  COCKTAIL,
  COMB,
  SHELL,
  HEAP,
  MERGE,
  QUICK,
  RADIX,
  RUNNING,
  PAUSED,
  NOT_RUNNING,
  HORIZONTAL,
  VERTICAL,
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT,
  TOP_TO_BOTTOM,
  BOTTOM_TO_TOP,
  RED,
  GREEN,
  BLUE,
  GRAY,
  HUE,
  SATURATION,
  BRIGHTNESS
} from "root/constants";

// Unfortunately symbols can't be passed as value to <select>.
const algorithms = {
  bogo: BOGO,
  selection: SELECTION,
  cycle: CYCLE,
  insertion: INSERTION,
  bubble: BUBBLE,
  cocktail: COCKTAIL,
  comb: COMB,
  shell: SHELL,
  heap: HEAP,
  merge: MERGE,
  quick: QUICK,
  radix: RADIX
};

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortState: NOT_RUNNING,
      sortDirection: LEFT_TO_RIGHT,
      sortAlgorithm: "shell",
      scale: 1,
      color: RED,
      recording: false
    };
    this.capturer = new CCapture({
      format: "gif",
      workersPath: "node_modules/ccapture.js/src/",
      framerate: 60
    });
  }

  pixel = null;
  capturer = null;
  raster = null;
  defaultImageSize = null;

  getSortButtonText() {
    if (
      this.state.sortState === PAUSED ||
      this.state.sortState === NOT_RUNNING
    ) {
      return "Sort";
    } else {
      return "Pause";
    }
  }

  onRunPauseButtonClick() {
    this.setState(({ sortState }) => {
      if (sortState === RUNNING) {
        paper.view.autoUpdate = false;
        this.pixel.pause();
        return { sortState: PAUSED };
      } else if (sortState === NOT_RUNNING) {
        paper.view.autoUpdate = true;
        this.pixel
          .run(
            createComparator(this.state.color, this.state.sortAlgorithm),
            this.raster,
            {
              algorithm: algorithms[this.state.sortAlgorithm],
              direction: this.state.sortDirection
            }
          )
          .then(promises => {
            Promise.all(promises).then(() => {
              paper.view.autoUpdate = false;
              this.setState({ sortState: NOT_RUNNING });
            });
          });
        return { sortState: RUNNING };
      } else if (sortState === PAUSED) {
        paper.view.autoUpdate = true;
        this.pixel.continue().then(promises => {
          Promise.all(promises).then(() => {
            paper.view.autoUpdate = false;
            this.setState({ sortState: NOT_RUNNING });
          });
        });
        return { sortState: RUNNING };
      }
    });
  }

  onStopButtonClick() {
    this.pixel.stop();
    paper.view.autoUpdate = false;
    this.setState({ sortState: NOT_RUNNING });
  }

  onResetButtonClick() {
    this.setState({ sortState: NOT_RUNNING }, () => {
      this.pixel.stop();
      paper.view.autoUpdate = false;
      this.raster.remove();
      this.raster = new paper.Raster(this.props.image);
      this.raster.onLoad = () => {
        this.raster.size = this.raster.size.multiply(this.state.scale);
        this.raster.bounds.topLeft = [0, 0];
        paper.view.update();
      };
    });
  }

  onRecordClick() {
    if (!this.state.recording) {
      paper.view.onFrame = event => {
        this.capturer.capture(this.refs.canvas);
      };
      this.capturer.start();
    } else {
      paper.view.onFrame = null;
      this.capturer.stop();
      this.capturer.save();
    }
    this.setState(({ recording }) => {
      return { recording: !recording };
    });
  }

  render() {
    return (
      <div className="w-100 mt3 avenir dark-gray">
        <div className="pa3">
          <button
            className="input-reset ba b--black-20 black-70 bg-transparent hover-bg-black hover--white hover f6 mr3"
            onClick={this.onRunPauseButtonClick.bind(this)}
          >
            {this.getSortButtonText()}
          </button>
          <button
            className="input-reset ba b--black-20 black-70 bg-transparent hover-bg-black hover--white hover f6 mh3"
            onClick={this.onStopButtonClick.bind(this)}
          >
            Stop
          </button>
          <button
            className="input-reset ba b--black-20 black-70 bg-transparent hover-bg-black hover--white hover f6 mh3"
            onClick={this.onResetButtonClick.bind(this)}
          >
            Reset
          </button>
          {/* <button
                        className="input-reset ba b--black-20 black-70 bg-transparent hover-bg-black hover--white hover f6 mh3"
                        onClick={this.onRecordClick.bind(this)}>
                        {this.state.recording ? 'Stop Recording' : 'Start Recording'}
                    </button> */}
        </div>
        <div className="ma3">
          <label>
            Algorithm
            <select
              className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
              value={this.state.sortAlgorithm}
              onChange={e => {
                this.setState({ sortAlgorithm: e.target.value });
              }}
            >
              <option value="bogo">Bogo Sort</option>
              <option value="bubble">Bubble Sort</option>
              <option value="cocktail">Cocktail Sort</option>
              <option value="comb">Comb Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="cycle">Cycle Sort</option>
              <option value="shell">Shell Sort</option>
              <option value="heap">Heap Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="radix">Radix Sort</option>
            </select>
          </label>
          <label>
            Direction
            <select
              className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
              value={this.state.sortDirection}
              onChange={e => {
                this.setState({ sortDirection: e.target.value });
              }}
            >
              <option value={LEFT_TO_RIGHT}>Left to Right</option>
              <option value={RIGHT_TO_LEFT}>Right to Left</option>
              <option value={TOP_TO_BOTTOM}>Top to Bottom</option>
              <option value={BOTTOM_TO_TOP}>Bottom to Top</option>
            </select>
          </label>
          <label>
            Color:
            <select
              className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
              value={this.state.color}
              onChange={e => {
                this.setState({ color: e.target.value });
              }}
            >
              <option value={RED}>Red</option>
              <option value={GREEN}>Green</option>
              <option value={BLUE}>Blue</option>
              <option value={GRAY}>Gray</option>
              <option value={HUE}>Hue</option>
              <option value={SATURATION}>Saturation</option>
              <option value={BRIGHTNESS}>Brightness</option>
            </select>
          </label>
          <label>
            Scale:
            <input
              type="number"
              value={this.state.scale}
              step="0.01"
              min="0"
              onChange={e => {
                this.setState({ scale: e.target.value });
              }}
            />
          </label>
          <button
            className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
            onClick={e => {
              download(raster.toDataURL());
            }}
          >
            Download
          </button>
        </div>
        <canvas ref="canvas" className="ma2 w-100 h-100"></canvas>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.image !== this.props.image) {
      this.raster.remove();
      this.displayImage();
    } else if (prevState.scale !== this.state.scale) {
      this.raster.remove();
      this.displayImage();
    }
  }

  componentDidMount() {
    paper.setup(this.refs.canvas);
    paper.view.autoUpdate = false;
    this.displayImage();
  }

  displayImage() {
    this.raster = new paper.Raster(this.props.image);
    window.raster = this.raster;
    this.raster.onLoad = () => {
      this.defaultImageSize = this.raster.size;
      this.pixel = new PixelSorter(this.raster);
      this.raster.size = this.defaultImageSize.multiply(this.state.scale);
      this.raster.bounds.topLeft = [0, 0];
      paper.view.update();
    };
  }
}

function createComparator(color, algorithm) {
  if (algorithm === "radix") {
    return a => a[color];
  } else {
    return (a, b) => compare.number(a[color], b[color]);
  }
}

Image.propTypes = {
  src: PropTypes.string
};

export default Image;
