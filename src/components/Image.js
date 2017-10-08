import React, {Component} from "react";
import PropTypes from "prop-types";
import paper from "paper";
import {prop} from "ramda";
import * as record from "utils/record";
import * as compare from "../compare";
// import PixelSorter, * as pixel from "../pixelsorter";
import PixelSorter from "../PixelSorter";
import * as exchange from "sort/exchange";
import {SELECTION, INSERTION, BUBBLE, SHELL, MERGE, QUICK} from "root/constants";

class Image extends Component {

    pixel: null

    render () {
        return (
            <div className="w-100 mt3">
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                        this.pixel = new PixelSorter(this.raster);
                        record.time(() => (
                            this.pixel.sort(
                                (a, b) => compare.number(a.blue, b.blue),
                                this.raster,
                                {algorithm: SELECTION}
                            )));
                        record.log(exchange);
                        paper.view.update();
                    }}>Sort</button>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                        this.pixel.stop();
                    }}>Stop</button>
                <button
                    className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                    onClick={() => {
                        this.pixel.stop();
                        this.raster.remove();
                        this.raster = new paper.Raster(this.props.image);
                        this.raster.onLoad = () => {
                            this.raster.size = this.raster.size.multiply(this.props.scale);
                            this.raster.translate((this.raster.width / 2) + 20, (this.raster.height / 2) + 20);
                            paper.view.update();
                        }
                    }}>Reset</button>
                <canvas ref="canvas" className="w-100"></canvas>
            </div>
        );
    }

    raster: null

    componentDidMount () {
        paper.setup(this.refs.canvas);
        this.raster = new paper.Raster(this.props.image);
        this.raster.onLoad = () => {
            this.raster.size = this.raster.size.multiply(this.props.scale);
            this.raster.translate((this.raster.width / 2) + 20, (this.raster.height / 2) + 20);
            paper.view.update();
        }
    }
}

Image.propTypes = {
    src: PropTypes.string,
    scale: PropTypes.number
};

Image.defaultProps = {
    scale: 1
};

export default Image;
