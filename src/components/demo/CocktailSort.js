import React, {Component} from "react";
import {Motion, spring} from "react-motion";
import PropTypes from "prop-types";
import {range, assoc, last} from "ramda";
import {shuffle} from "sort/exchange";
import * as sort from "sort/cocktail";
import * as exchange from "sort/exchange";
import * as compare from "root/compare";

const list = [3, 2, 6, 0, 4, 5, 1];

// Talk about sorted elements.
// Talk about passes and swaps.
// Talk about turtles.
const descriptions = [
    `Cocktail sort begins the same way as bubble sort, by passing through the list
    comparing adjacent elements and swapping when they are out of order.`,

    `Now rather than going back to the beginning of the list to start the next pass, it
    will work its way through the list in the opposite direction. Notice `
];

function defaultSortState () {
    return {
        list,
        exchanges: 0,
        compare: [],
        description: descriptions[0],
        sorted: false,
        sortedRight: undefined,
        sortedLeft: undefined
    };
}

// copy the list before sorting because sort is in-place.
const demo = new sort.demo(
    exchange.indices,
    compare.number,
    list.map(n => n));

const sortStates = [...demo].reduce((acc, state) => {
    const previousState = last(acc);
    const nextState = Object.assign({}, previousState, state);
    return acc.concat(nextState);
}, [defaultSortState()]);

class CocktailSort extends Component {
    constructor (props) {
        super(props);
        this.state = {
            running: false,
            stateIndex: 0
        }
    }

    blockColor ({compare, sortedRight, sortedLeft, sorted}, index) {
        if (sorted) {
            return 'bg-green';
        } else if (index >= sortedRight || index <= sortedLeft) {
            return 'bg-green';
        } else {
            return compare.includes(index) ? 'bg-blue' : '';
        }
    }

    getState (index) {
        let state = sortStates[index];
        let additional = {};

        if (index < 3) {
            additional = {description: descriptions[0]};
        } else if (index < 5) {
            additional = {description: descriptions[1]};
        }

        if (index >= sortStates.length-1) {
            additional = {sorted: true};
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
                <h1 className="ml3">Cocktail Sort</h1>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                        if (!this.state.running) {
                            this.setState({running: true});
                            this.interval = setInterval(() => {
                                if (this.state.stateIndex >= sortStates.length-1) {
                                    clearInterval(this.interval);
                                } else {
                                    this.incSortState();
                                }
                            }, 1000);
                        } else {
                            clearInterval(this.interval);
                            this.setState({running: false})
                        }
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
                <span className="mh3">Swaps: {state.exchanges}</span>
                {this.props.showSortState ? `Sort State: ${this.state.stateIndex}` : ""}
                <p className="mh3">{state.description}</p>
                <div className="ma3 h4 relative">
                    {blocks}
                </div>
            </div>
        );
    }
}

CocktailSort.propTypes = {
    showSortState: PropTypes.bool,
    list: PropTypes.array
};

export default CocktailSort;
