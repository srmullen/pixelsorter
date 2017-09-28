import React, {Component} from "react";
import PropTypes from "prop-types";
import paper from "paper";
import {prop} from "ramda";
import {timeFunc} from "utils/time";
import * as compare from "../compare";
import * as selection from "sort/selection";
import * as insertion from "sort/insertion";
import * as bubble from "sort/bubble";
import * as shell from "sort/shell";
import * as merge from "sort/merge";

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
            const {time} = timeFunc(() => pixelSort(raster));
            console.log(time);
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
    // const sorted = sort.ramdaSort(prop("green"), row);
    const sorted = merge.sort((a, b) => compare.number(a.green, b.green), row);
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
