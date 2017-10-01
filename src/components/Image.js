import React, {Component} from "react";
import PropTypes from "prop-types";
import paper from "paper";
import {prop} from "ramda";
import * as record from "utils/record";
import * as compare from "../compare";
import * as selection from "sort/selection";
import * as insertion from "sort/insertion";
import * as bubble from "sort/bubble";
import * as shell from "sort/shell";
import * as merge from "sort/merge";
import * as quick from "sort/quick";
// import {exchange} from "sort/exchange";
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
            record.time(() => pixelSort(raster));
            record.log(exchange);
            raster.translate((raster.width / 2) + 20, (raster.height / 2) + 20);
            paper.view.update();
        }
        window.raster = raster;
    }
}

function pixelSort (raster) {
    for (let i = 0; i < 10; i++) {
        sortRow(raster, i);
    }
}

function sortRow (raster, rowIndex) {
    const row = getRow(rowIndex, raster);
    const sorted = shell.sort(exchange, (a, b) => compare.number(a.green, b.green), row);
    sorted.map((color, i) => {
        raster.setPixel(i, rowIndex, color);
    });
}

function getRow (row, raster) {
    const ret = []
    for (let i = 0; i < raster.width; i++) {
        ret.push(raster.getPixel(i, row));
    }
    return ret;
}

Image.propTypes = {
    src: PropTypes.string
};

export default Image;
