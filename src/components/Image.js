import React, {Component} from "react";
import PropTypes from "prop-types";
import paper from "paper";

class Image extends Component {
    render () {
        return (
            <div>
                <canvas ref="canvas"></canvas>
                <img id="image" src={this.props.image} className="dn" />
            </div>
        );
    }

    componentDidMount () {
        paper.setup(this.refs.canvas);
        const raster = new paper.Raster("image");
    }
}

Image.propTypes = {
    src: PropTypes.string
};

export default Image;
