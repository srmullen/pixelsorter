import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";
import { range, assoc, last } from "ramda";
import { shuffle } from "sort/exchange";
import * as sort from "sort/bogo";
import * as exchange from "sort/exchange";
import * as compare from "root/compare";

const list = [2, 3, 1, 0];

const descriptions = [
  `Bogo Sort is a very rudimentary "algorithm". I use quotes around the word algorithm
    because it is not gauranteed to run in a finite amount of time. It starts out by
    checking if the list is already sorted. If elements are found to be out of order
    then the whole list is randomly shuffled and checked for correct order again. This
    process continues until a correct order is found.`,

  `It starts by walking through the list comparing adjacent elements. Elements being compared
    are highlighted in blue. 2 and 3 are in order so the algorithm moves on to the next adjacent elements.`,

  `Now it compares 3 and 1. These are not in order so the list will be shuffled randomly.
    From this point on I cannot say how long until the list is sorted. There are only 4 elements
    so chances are you won't be waiting until the end of time, but no promises.`,

  `You made it! Bogo Sort is complete. Let's move on to more practical sorting algorithms
    (or ones that are at least gauranteed to finish).`
];

function defaultSortState() {
  return {
    list,
    exchanges: 0,
    compare: [],
    description: descriptions[0]
  };
}

// copy the list before sorting because sort is in-place.
const demo = new sort.demo(
  shuffle,
  compare.number,
  list.map(n => n)
);

const sortStates = [...demo].reduce(
  (acc, state) => {
    const previousState = last(acc);
    const nextState = Object.assign({}, previousState, state);
    return acc.concat(nextState);
  },
  [defaultSortState()]
);

console.log(sortStates);

class BogoSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      stateIndex: 0,
      sorted: false
    };
  }

  blockColor({ compare, sorted }, index) {
    if (sorted) {
      return "bg-green";
    } else {
      return compare.includes(index) ? "bg-blue" : "";
    }
  }

  getState(index) {
    let state = sortStates[index];
    let additional = {};

    if (index < 1) {
      additional = { description: descriptions[0] };
    } else if (index < 2) {
      additional = { description: descriptions[1] };
    } else if (index < sortStates.length - 1) {
      additional = { description: descriptions[2] };
    } else {
      additional = { description: descriptions[3], sorted: true };
    }

    return { ...state, ...additional };
  }

  incSortState() {
    this.setState(({ stateIndex }) => {
      const state =
        stateIndex < sortStates.length - 1
          ? { stateIndex: stateIndex + 1 }
          : { stateIndex };
      return state;
    });
  }

  decSortState() {
    this.setState(previous => {
      const stateIndex =
        previous.stateIndex > 0 ? previous.stateIndex - 1 : previous.stateIndex;
      return { stateIndex };
    });
  }

  interval = null;

  render() {
    const state = this.getState(this.state.stateIndex);
    const blocks = state.list.map((n, i) => {
      return (
        <Motion
          key={n}
          defaultStyle={{ left: i * 100 }}
          style={{ left: spring(i * 100) }}
        >
          {styles => (
            <div
              className={`m1 f2 pa4 ba absolute dib ${this.blockColor(
                state,
                i
              )}`}
              style={{ left: styles.left }}
            >
              {n}
            </div>
          )}
        </Motion>
      );
    });

    return (
      <div className="ma3 pa2 avenir dark-gray">
        <h1 className="ml3">Bogo Sort</h1>
        <button
          className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
          onClick={() => {
            if (!this.state.running) {
              this.setState({ running: true });
              this.interval = setInterval(() => {
                if (this.state.stateIndex >= sortStates.length - 1) {
                  clearInterval(this.interval);
                } else {
                  this.incSortState();
                }
              }, 1000);
            } else {
              clearInterval(this.interval);
              this.setState({ running: false });
            }
          }}
        >
          {this.state.running ? "Pause" : "Run"}
        </button>
        <button
          className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
          onClick={this.decSortState.bind(this)}
        >
          -
        </button>
        <button
          className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
          onClick={this.incSortState.bind(this)}
        >
          +
        </button>
        <button
          className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
          onClick={() => {
            clearInterval(this.interval);
            this.setState({
              stateIndex: 0,
              running: false
            });
          }}
        >
          Reset
        </button>
        <span className="mh3">Swaps: {state.exchanges}</span>
        {this.props.showSortState ? `Sort State: ${this.state.stateIndex}` : ""}
        <p className="mh3">{state.description}</p>
        <div className="ma3 h4 relative">{blocks}</div>
      </div>
    );
  }
}

BogoSort.propTypes = {
  showSortState: PropTypes.bool,
  list: PropTypes.array
};

export default BogoSort;
