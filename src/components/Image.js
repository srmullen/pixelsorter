import React, {Component} from "react";
import PropTypes from "prop-types";
import paper from "paper";
import {sortBy, prop} from "ramda";

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
        const rowIndex = 10;
        raster.onLoad = () => {
            const row = getRow(rowIndex, raster);
            const sorted = sortBy(prop("red"), row);
            sorted.map((color, i) => {
                raster.setPixel(i, rowIndex, color);
            });
            raster.translate((raster.width / 2) + 20, (raster.height / 2) + 20);
            paper.view.update();
        }
        window.raster = raster;
    }
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
