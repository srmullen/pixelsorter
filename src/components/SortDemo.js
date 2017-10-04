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
        const blocks = this.state.list.map((n, i) => {
            return <div key={n} className={`m1 w4 h${REMS} ba absolute`} style={{left: i * 200}}>{n}</div>
        });

        return (
            <div className="ma3 pa2">
                <button onClick={() => {
                    // copy the list before sorting because sort is in-place.
                    const sorted = this.props.sort(
                        this.props.exchange,
                        this.props.compare,
                        this.state.list.map(n => n));
                    this.setState({list: sorted});
                }}>Sort</button>
                <div className="ma3 relative">
                    {blocks}
                </div>
            </div>
        );
    }
}

SortDemo.propTypes = {
    exchange: PropTypes.func.isRequired,
    compare: PropTypes.func.isRequired,
    sort: PropTypes.func.isRequired
};

export default SortDemo;
