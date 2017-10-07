import * as selection from "sort/selection";
import * as insertion from "sort/insertion";
import * as bubble from "sort/bubble";
import * as shell from "sort/shell";
import * as merge from "sort/merge";
import * as quick from "sort/quick";
import * as exchange from "sort/exchange";
import {SELECTION, INSERTION, BUBBLE, SHELL, MERGE, QUICK} from "root/constants";

const algorithms = {
    [SELECTION]: selection,
    [INSERTION]: insertion,
    [BUBBLE]: bubble,
    [SHELL]: shell,
    [MERGE]: merge,
    [QUICK]: quick
};

function PixelSorter (raster) {
    this.raster = raster;
    this._row_interval = null;
    this._step_intervals = [];
}

// Why does this run faster with a timeout than with a 'for' loop?
PixelSorter.prototype.sort = function sort (compare, raster, options = {algorithm: INSERTION}) {
    let row = 0;
    const exchangeFn = options.algorithm === MERGE ? exchange.copyFromList : exchange.indices;
    this._row_interval = setInterval(() => {
        this.sortRow(options, exchange.pixels(exchangeFn, raster, row), compare, raster, row);
        if (row > raster.height) {
            clearInterval(this._row_interval);
        }
        row++;
    }, 1);
}

PixelSorter.prototype.stop = function stop () {
    clearInterval(this._row_interval);
    this._step_intervals.map(interval => clearInterval(interval));
    this._step_intervals = [];
};

PixelSorter.prototype.sortRow = function (options, exchange, compare, raster, rowIndex) {
    const row = getRow(rowIndex, raster);
    // selection.sort(exchange, compare, row);
    const gen = new algorithms[options.algorithm].step(exchange, compare, row);
    const interval = setInterval(() => {
        const {value, done} = gen.next();
        if (done) {
            clearInterval(interval);
        }
    }, 1);
    this._step_intervals.push(interval);
}

function getRow (row, raster) {
    const ret = []
    for (let i = 0; i < raster.width; i++) {
        ret.push(raster.getPixel(i, row));
    }
    return ret;
}

export default PixelSorter;
