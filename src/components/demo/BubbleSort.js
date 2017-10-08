import React, {Component} from "react";
import {TransitionMotion, Motion, spring} from "react-motion";
import PropTypes from "prop-types";
import {range} from "ramda";
import {shuffle} from "utils/sort";
import * as bubble from "sort/bubble";

const REMS = 4;

class SortDemo extends Component {
    constructor (props) {
        super(props);
        let list;
        if (!props.list) {
            list = range(0, 10);
            shuffle(list);
        } else {
            list = props.list;
        }
        this.state = {
            list,
            exchanges: 0,
            compare: []
        };
    }

    render () {
        const blocks = this.state.list.map((n, i) => {
            return (
                <Motion key={n} defaultStyle={{left: i * 100}} style={{left: spring(i * 100)}}>
                    {styles => (
                        <div
                            className={`m1 f2 pa4 ba absolute dib ${this.state.compare.includes(i) ? 'bg-blue' : ''}`}
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
                    const sortGen = new bubble.demo(
                        this.props.exchange,
                        this.props.compare,
                        this.state.list.map(n => n));

                    const interval = setInterval(() => {
                        const {value, done} = sortGen.next();
                        if (done) {
                            clearInterval(interval);
                            this.setState({compare: []});
                        } else {
                            this.setState(value);
                        }
                    }, 500);
                }}>Sort</button>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                    this.setState(({list}) => {
                        shuffle(list);
                        return {list, comparison: []};
                    });
                }}>Shuffle</button>
                Exchanges: {this.state.exchanges}
                <div className="ma3 h4 relative">
                    {blocks}
                </div>
            </div>
        );
    }
}

SortDemo.propTypes = {
    exchange: PropTypes.func.isRequired,
    compare: PropTypes.func.isRequired,
    list: PropTypes.array
};

export default SortDemo;
