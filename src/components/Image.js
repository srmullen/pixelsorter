import React, {Component} from "react";
import PropTypes from "prop-types";
import paper from "paper";
import {prop} from "ramda";
import * as record from "utils/record";
import * as compare from "../compare";
import * as pixel from "../pixelsorter";
import * as exchange from "sort/exchange";
// const exchange = record.calls(require("sort/exchange").exchange);

class Image extends Component {
    render () {
        return (
            <div className="w-100">
                <button onClick={() => {
                    record.time(() => pixel.sort(exchange.pixels(raster), (a, b) => compare.number(a.blue, b.blue), this.raster));
                    record.log(exchange);
                    paper.view.update();
                }}>Sort</button>
                <canvas ref="canvas" className="w-100"></canvas>
            </div>
        );
    }

    raster: null

    componentDidMount () {
        paper.setup(this.refs.canvas);
        this.raster = new paper.Raster(this.props.image);
        this.raster.onLoad = () => {
            this.raster.translate((this.raster.width / 2) + 20, (this.raster.height / 2) + 20);
            paper.view.update();
        }
        window.raster = this.raster;
    }
}

Image.propTypes = {
    src: PropTypes.string
};

export default Image;
