import React, {Component} from "react";
import {TransitionMotion, Motion, spring} from "react-motion";
import PropTypes from "prop-types";
import {range} from "ramda";

const REMS = 4;

class SortDemo extends Component {
    constructor (props) {
        super(props);
        const list = range(0, 5);
        shuffle(list);
        this.state = {
            list
        };
    }

    render () {
        const blocks = this.state.list.map((n, i) => {
            return (
                <Motion key={n} defaultStyle={{left: i * 200}} style={{left: spring(i * 200)}}>
                    {styles => (
                        <div className={`m1 w4 h${REMS} ba absolute`} style={{left: styles.left}}>
                            {n}
                        </div>
                    )}
                </Motion>
            );
        });

        return (
            <div className="ma3 pa2">
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                    // copy the list before sorting because sort is in-place.
                    const sortGen = new this.props.sort(
                        this.props.exchange,
                        this.props.compare,
                        this.state.list.map(n => n));
                    const {value} = sortGen.next();
                    this.setState({list: value});
                }}>Sort</button>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                    this.setState(({list}) => {
                        shuffle(list);
                        return {list} ;
                    });
                }}>Shuffle</button>
                <div className="ma3 relative">
                    {blocks}
                </div>
            </div>
        );
    }
}

function shuffle (a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

SortDemo.propTypes = {
    exchange: PropTypes.func.isRequired,
    compare: PropTypes.func.isRequired,
    sort: PropTypes.func.isRequired
};

export default SortDemo;
