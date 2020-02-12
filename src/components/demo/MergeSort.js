import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";
import { range, assoc, last } from "ramda";
import { shuffle } from "sort/exchange";
import * as sort from "sort/merge";
import * as exchange from "sort/exchange";
import * as compare from "root/compare";
import * as block from "components/demo/Block";

// const list = [3, 2, 6, 0, 4, 5, 1];
const list = range(0, 10).map(block.create);
shuffle(list);

const descriptions = [<p>Merge Sort</p>];

function defaultSortState() {
  return {
    list,
    copy: [],
    exchanges: 0,
    compare: [],
    description: descriptions[0],
    sorted: false
  };
}

// copy the list before sorting because sort is in-place.
const demo = new sort.demo(
  exchange.copyFromList,
  (a, b) => compare.number(a.val, b.val),
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

class MergeSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      stateIndex: 0
    };
  }

  // Need to highlight subtree root and chilren.
  blockColor({ compare, sorted, copy }, index) {
    if (sorted) {
      return "bg-green";
      // } else if (index >= copy[0] && index < copy[1]) {
      //     return 'bg-red';
    } else {
      return compare.includes(index) ? "bg-blue" : "";
    }
  }

  getState(index) {
    let state = sortStates[index];
    let additional = { description: descriptions[0] };

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
      const top = i >= state.copy[0] && i < state.copy[1] ? 120 : 0;
      return (
        <Motion
          key={n.id}
          defaultStyle={{ top: 0, left: i * 100 }}
          style={{ top: spring(top), left: spring(i * 100) }}
        >
          {styles => (
            <div
              className={`m1 f2 pa4 ba absolute dib ${this.blockColor(
                state,
                i
              )}`}
              style={styles}
            >
              {n.val}
            </div>
          )}
        </Motion>
      );
    });

    // const copy = state.copy.map((n, i) => {
    //     return (
    //         <Motion key={n.id} defaultStyle={{top: 0, left: i * 100}} style={{top: spring(120), left: spring(i * 100)}}>
    //             {styles => (
    //                 <div
    //                     className={`m1 f2 pa4 ba absolute dib ${this.blockColor(state, i)}`}
    //                     style={{top: styles.top, left: styles.left}}>
    //                     {n.val}
    //                 </div>
    //             )}
    //         </Motion>
    //     );
    // });

    return (
      <div className="ma3 pa2 avenir dark-gray">
        <h1 className="ml3">Merge Sort</h1>
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
        <div className="mh3">{state.description}</div>
        <div className="ma3 h5 relative">
          {blocks}
          {/* {copy} */}
        </div>
      </div>
    );
  }
}

MergeSort.propTypes = {
  showSortState: PropTypes.bool,
  list: PropTypes.array
};

export default MergeSort;
