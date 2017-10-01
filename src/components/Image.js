import React, {Component} from "react";
import PropTypes from "prop-types";
import paper from "paper";
import {prop} from "ramda";
import * as record from "utils/record";
import * as compare from "../compare";
import * as pixel from "../pixelsorter";
const exchange = record.calls(require("sort/exchange").exchange);

class Image extends Component {
    render () {
        return (
            <div className="w-100">
                <canvas ref="canvas" className="w-100"></canvas>
            </div>
        );
    }

    componentDidMount () {
        paper.setup(this.refs.canvas);
        const raster = new paper.Raster(this.props.image);
        raster.onLoad = () => {
            record.time(() => pixel.sort(exchange, (a, b) => compare.number(a.blue, b.blue), raster));
            record.log(exchange);
            raster.translate((raster.width / 2) + 20, (raster.height / 2) + 20);
            paper.view.update();
        }
        window.raster = raster;
    }
}

Image.propTypes = {
    src: PropTypes.string
};

export default Image;
