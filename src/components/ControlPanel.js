import React, { Component } from 'react';
import PropTypes from "prop-types";

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

class ControlPanel extends Component {

  constructor(props) {
    super(props);
  }

  getSortButtonText() {
    if (
      this.props.sortState === PAUSED ||
      this.props.sortState === NOT_RUNNING
    ) {
      return "Sort";
    } else {
      return "Pause";
    }
  }

  render() {
    return (<>
      <div className="pa3">
        <button
          className="input-reset ba b--black-20 black-70 bg-transparent hover-bg-black hover--white hover f6 mr3"
          onClick={this.props.onRunPauseButtonClick}
        >
          {this.getSortButtonText()}
        </button>
        <button
          className="input-reset ba b--black-20 black-70 bg-transparent hover-bg-black hover--white hover f6 mh3"
          onClick={this.props.onStopButtonClick}
        >
          Stop
          </button>
        <button
          className="input-reset ba b--black-20 black-70 bg-transparent hover-bg-black hover--white hover f6 mh3"
          onClick={this.props.onResetButtonClick}
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
            value={this.props.sortAlgorithm}
            onChange={e => {
              this.props.onPropChange({ sortAlgorithm: e.target.value });
            }}
          >
            <option value={BOGO}>Bogo Sort</option>
            <option value={BUBBLE}>Bubble Sort</option>
            <option value={COCKTAIL}>Cocktail Sort</option>
            <option value={COMB}>Comb Sort</option>
            <option value={SELECTION}>Selection Sort</option>
            <option value={INSERTION}>Insertion Sort</option>
            <option value={CYCLE}>Cycle Sort</option>
            <option value={SHELL}>Shell Sort</option>
            <option value={HEAP}>Heap Sort</option>
            <option value={MERGE}>Merge Sort</option>
            <option value={QUICK}>Quick Sort</option>
            <option value={RADIX}>Radix Sort</option>
          </select>
        </label>
        <label>
          Direction
            <select
            className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
            value={this.props.sortDirection}
            onChange={e => {
              this.props.onPropChange({ sortDirection: e.target.value });
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
            value={this.props.color}
            onChange={e => {
              this.props.onPropChange({ color: e.target.value });
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
            value={this.props.scale}
            step="0.01"
            min="0"
            onChange={e => {
              this.props.onPropChange({ scale: Number(e.target.value) });
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
      </>
    );
  }
}

ControlPanel.propTypes = {
  sortState: PropTypes.string.isRequired,
  sortAlgorithm: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onPropChange: PropTypes.func.isRequired,
  onRunPauseButtonClick: PropTypes.func.isRequired,
  onStopButtonClick: PropTypes.func.isRequired,
  onResetButtonClick: PropTypes.func.isRequired
};

export default ControlPanel;