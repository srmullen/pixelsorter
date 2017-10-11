import React, {Component} from "react";
import {TransitionMotion, Motion, spring} from "react-motion";
import PropTypes from "prop-types";
import {range, assoc, last} from "ramda";
import {shuffle} from "sort/exchange";
import * as bubble from "sort/bubble";
import * as exchange from "sort/exchange";
import * as compare from "../../compare";

const list = [3, 2, 0, 4, 5, 1];

// Talk about sorted elements.
// Talk about passes and swaps.
// Talk about turtles.
const descriptions = [
    `We begin by comparing the first two elements of the list. 3 is larger
    than two so they get swapped and our swap counter is incremented.`,

    `The algorithm then moves on and compares the next two numbers. 3 is larger
    than one so again they get swapped. Look at that, The 3 is "bubbling" up!`,

    `After the first pass through the list the largest element will have "bubbled" to the top.
    No elements in the list will be higher than this one so it can be marked as sorted and won't need
    to be compared anymore.`,

    `Now the algorithm will start again at the beginning of the list comparing adjacent elements`,

    `Notice that elements in a position greater than where they should be are only able to move one step
    closer to their correct position on each pass. This is called "turtling". Insert Dana Carvey in master of disguise here.
    Mark the turtle as red.`,

    `On this pass through the list there are no swaps that have occured, so the list is sorted and
    the algorithm stops.`
];

function defaultSortState () {
    return {
        list,
        exchanges: 0,
        compare: [],
        description: descriptions[0],
        bubbleTo: undefined,
    };
}

// copy the list before sorting because sort is in-place.
const demo = new bubble.demo(
    exchange.indices,
    compare.number,
    list.map(n => n));

const sortStates = [...demo].reduce((acc, state) => {
    const previousState = last(acc);
    const nextState = Object.assign({}, previousState, state);
    return acc.concat(nextState);
}, [defaultSortState()]);

class BubbleSort extends Component {
    constructor (props) {
        super(props);
        this.state = {
            running: false,
            stateIndex: 0
        }
    }

    blockColor ({compare, bubbleTo}, index) {
        if (index > bubbleTo) {
            return 'bg-green';
        } else {
            return compare.includes(index) ? 'bg-blue' : '';
        }
    }

    getState (index) {
        let state = sortStates[index];
        let additional = {running: true};

        if (index < 3) {
            additional = {description: descriptions[0]};
        } else if (index < 5) {
            additional = {description: descriptions[1]};
        }

        if (index >= sortStates.length) {
            additional = {bubbleTo: -1};
        }

        return {...state, ...additional};
    }

    incSortState () {
        this.setState(previous => {
            const stateIndex = previous.stateIndex < sortStates.length-1 ?
                previous.stateIndex + 1 : previous.stateIndex;
            return {stateIndex};
        });
    }

    decSortState () {
        this.setState(previous => {
            const stateIndex = previous.stateIndex > 0 ?
                previous.stateIndex - 1 : previous.stateIndex;
            return {stateIndex};
        });
    }

    interval: null

    render () {
        const state = this.getState(this.state.stateIndex);
        const blocks = state.list.map((n, i) => {
            return (
                <Motion key={n} defaultStyle={{left: i * 100}} style={{left: spring(i * 100)}}>
                    {styles => (
                        <div
                            className={`m1 f2 pa4 ba absolute dib ${this.blockColor(state, i)}`}
                            style={{left: styles.left}}>
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
                            this.interval = setInterval(() => {
                                if (this.state.stateIndex >= sortStates.length-1) {
                                    clearInterval(this.interval);
                                } else {
                                    // this.setState(previous => ({stateIndex: previous.stateIndex + 1}));
                                    this.incSortState();
                                }
                            }, 1000);
                        } else {
                            clearInterval(this.interval);
                        }
                        this.setState(previous => ({running: !previous.running}));
                    }}
                >
                    {this.state.running ? "Pause" : "Run"}
                </button>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={this.decSortState.bind(this)}>
                    -
                </button>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={this.incSortState.bind(this)}>
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
                Swaps: {this.state.exchanges}
                <p className="mh3">{state.description}</p>
                <div className="ma3 h4 relative">
                    {blocks}
                </div>
            </div>
        );
    }
}

BubbleSort.propTypes = {
    exchange: PropTypes.func.isRequired,
    compare: PropTypes.func.isRequired,
    list: PropTypes.array
};

export default BubbleSort;
