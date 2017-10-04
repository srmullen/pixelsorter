import React, {Component} from "react";
import PropTypes from "prop-types";

const REMS = 4;

class SortDemo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: [3, 2, 1]
        };
    }

    render () {
        const blocks = this.state.list.map(n => {
            return <div key={n} className={`m1 w4 h${REMS} ba relative dib`}>{n}</div>
        });

        return (
            <div className="ma3 pa2">
                <button onClick={() => {
                    // copy the list before sorting because sort is in-place.
                    const sorted = this.props.sort(this.state.list.map(n => n));
                    console.log(sorted);
                }}>Sort</button>
                <div className="ma3 relative">
                    {blocks}
                </div>
            </div>
        );
    }
}

SortDemo.propTypes = {
    sort: PropTypes.func.isRequired
};

export default SortDemo;
