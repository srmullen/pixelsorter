import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import { range, assoc, last } from 'ramda';
import { shuffle } from 'sort/exchange';
import * as bubble from 'sort/bubble';
import * as exchange from 'sort/exchange';
import * as compare from 'root/compare';

const list = [3, 2, 5, 0, 4, 6, 1];

// Talk about sorted elements.
// Talk about passes and swaps.
// Talk about turtles.
const descriptions = [
  <p>
    We begin by comparing the first two elements of the list. 3 is larger than 2
    so they get swapped and our swap counter is incremented.
  </p>,

  <p>
    The algorithm then moves on and compares the next two numbers. 3 is smaller
    than 5 so this time they do not get swapped.
  </p>,

  <p>
    Now watch the five. It will get swapped a couple times in a row giving it
    the appearence of bubbling up, hence the name of the algorithm.
  </p>,

  <p>
    After the first pass through the list the largest element will have
    "bubbled" to the top. In this case the 6. No elements in the list will be
    higher than this one so it can be marked as sorted (in green) and won't need
    to be compared anymore.
  </p>,

  <p>
    Now the algorithm will start again at the beginning of the list comparing
    adjacent elements. Notice that elements in a position greater than where
    they should be (such as the 1) are only able to move one step closer to
    their correct position on each pass. This is called "
    <a
      href="http://noiselesschatter.com/wp-content/uploads/2012/06/masterdisguise10.png"
      alt="turtle"
      target="_blank"
    >
      turtling
    </a>
    " because of the slow pace for the element to find its correct location in
    the list. Imagine a large list that is entirely sorted except for one
    element which is a million steps away from its correct location. Bubble sort
    would require a million passes over the list to get the element into place.
  </p>,

  <p>
    On this pass through the list there are no swaps that have occured, so the
    list is sorted and the algorithm stops.
  </p>,

  <p>Congratulations! Your list is sorted. Let's move on.</p>
];

function defaultSortState() {
  return {
    list,
    exchanges: 0,
    compare: [],
    description: descriptions[0],
    bubbleTo: undefined
  };
}

// copy the list before sorting because sort is in-place.
const demo = new bubble.demo(
  exchange.indices,
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

class BubbleSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      stateIndex: 0
    };
  }

  blockColor({ compare, bubbleTo }, index) {
    if (index > bubbleTo) {
      return 'bg-green';
    } else {
      return compare.includes(index) ? 'bg-blue' : '';
    }
  }

  getState(index) {
    let state = sortStates[index];
    let additional = {};

    if (index <= 3) {
      additional = { description: descriptions[0] };
    } else if (index <= 4) {
      additional = { description: descriptions[1] };
    } else if (index <= 10) {
      additional = { description: descriptions[2] };
    } else if (index <= 11) {
      additional = { description: descriptions[3] };
    } else if (index <= 35) {
      additional = { description: descriptions[4] };
    } else if (index <= 37) {
      additional = { description: descriptions[5] };
    } else {
      additional = { description: last(descriptions), bubbleTo: -1 };
    }

    return { ...state, ...additional };
  }

  incSortState() {
    this.setState(previous => {
      const stateIndex =
        previous.stateIndex < sortStates.length - 1
          ? previous.stateIndex + 1
          : previous.stateIndex;
      return { stateIndex };
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
        <h1 className="ml3">Bubble Sort</h1>
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
          {this.state.running ? 'Pause' : 'Run'}
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
        {this.props.showSortState ? `Sort State: ${this.state.stateIndex}` : ''}
        <div className="mh3">{state.description}</div>
        <div className="ma3 h4 relative">{blocks}</div>
      </div>
    );
  }
}

BubbleSort.propTypes = {
  showSortState: PropTypes.bool,
  list: PropTypes.array
};

export default BubbleSort;
