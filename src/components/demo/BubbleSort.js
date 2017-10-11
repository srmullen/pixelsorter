import React, {Component} from "react";
import {TransitionMotion, Motion, spring} from "react-motion";
import PropTypes from "prop-types";
import {range} from "ramda";
import {shuffle} from "sort/exchange";
import * as bubble from "sort/bubble";

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

class BubbleSort extends Component {
    constructor (props) {
        super(props);
        this.state = this.defaultState();
    }

    defaultState () {
        return {
            list: [3, 2, 0, 4, 5, 1],
            exchanges: 0,
            compare: [],
            description: 0,
            bubbleTo: undefined
        };
    }

    blockColor (index) {
        if (index > this.state.bubbleTo) {
            return 'bg-green';
        } else {
            return this.state.compare.includes(index) ? 'bg-blue' : '';
        }
    }

    getDescription (state) {
        if (state < 1) {
            return 0;
        }

        return 1;
    }

    interval: null

    render () {
        const blocks = this.state.list.map((n, i) => {
            return (
                <Motion key={n} defaultStyle={{left: i * 100}} style={{left: spring(i * 100)}}>
                    {styles => (
                        <div
                            className={`m1 f2 pa4 ba absolute dib ${this.blockColor(i)}`}
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
                    // copy the list before sorting because sort is in-place.
                    const demo = new bubble.demo(
                        this.props.exchange,
                        this.props.compare,
                        this.state.list.map(n => n));

                    const states = [];
                    for (let v of demo) {
                        states.push(v);
                    }
                    let state = 0;
                    this.interval = setInterval(() => {
                        const description = this.getDescription(state);
                        this.setState({description, ...states[state]});
                        state++;
                        if (state >= states.length) {
                            clearInterval(this.interval);
                        }
                    }, 1000);
                }}>Sort</button>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                        clearInterval(this.interval);
                        this.setState(this.defaultState());
                    }}
                >
                    Reset
                </button>
                Swaps: {this.state.exchanges}
                <p className="mh3">{descriptions[this.state.description]}</p>
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
