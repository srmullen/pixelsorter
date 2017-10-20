import * as bogo from "sort/bogo";
import * as selection from "sort/selection";
import * as insertion from "sort/insertion";
import * as bubble from "sort/bubble";
import * as cocktail from "sort/cocktail";
import * as shell from "sort/shell";
import * as heap from "sort/heap";
import * as merge from "sort/merge";
import * as quick from "sort/quick";
import * as exchange from "sort/exchange";
import {
    BOGO, SELECTION, INSERTION, BUBBLE, COCKTAIL, SHELL, HEAP, MERGE, QUICK,
    RUNNING, PAUSED, NOT_RUNNING
} from "root/constants";

const algorithms = {
    [BOGO]: bogo,
    [SELECTION]: selection,
    [INSERTION]: insertion,
    [BUBBLE]: bubble,
    [COCKTAIL]: cocktail,
    [SHELL]: shell,
    [HEAP]: heap,
    [MERGE]: merge,
    [QUICK]: quick
};

const ROW_INTERVAL = Symbol("ROW_INTERVAL");
const STEP_INTERVALS = Symbol("STEP_INTERVALS");
const CURRENT_SORT = Symbol("CURRENT_SORT");

function PixelSorter (raster) {
    this.raster = raster;
    this[ROW_INTERVAL] = null;
    this[STEP_INTERVALS] = [];
    this[CURRENT_SORT] = null;
}

// Why does this run faster with a timeout than with a 'for' loop?
PixelSorter.prototype.sort = function sort (compare, raster, options = {algorithm: INSERTION}) {
    let row = 0;
    const exchangeFn = getExchangeFunc(options.algorithm);
    this[CURRENT_SORT] = {options, exchangeFn, compare, raster};
    this[ROW_INTERVAL] = setInterval(() => {
        this[STEP_INTERVALS].push(this.sortRow(options, exchange.pixels(exchangeFn, raster, row), compare, raster, row));
        if (row > raster.height) {
            clearInterval(this[ROW_INTERVAL]);
        }
        row++;
    }, 1);
}

PixelSorter.prototype.pause = function () {
    clearInterval(this[ROW_INTERVAL]);
    this[STEP_INTERVALS].forEach(({interval}) => clearInterval(interval));
}

PixelSorter.prototype.continue = function () {
    let row = 0;
    const {options, exchangeFn, compare, raster} = this[CURRENT_SORT];
    this[ROW_INTERVAL] = setInterval(() => {
        if (this[STEP_INTERVALS][row]) {
            const {gen} = this[STEP_INTERVALS][row];
            const interval = setInterval(() => {
                const {value, done} = gen.next();
                if (done) {
                    clearInterval(interval);
                }
            }, 1);
            this[STEP_INTERVALS][row] = {gen, interval};
        } else {
            this[STEP_INTERVALS][row] = this.sortRow(options, exchange.pixels(exchangeFn, raster, row), compare, raster, row);
        }
        if (row > this.raster.height) {
            clearInterval(this[ROW_INTERVAL]);
        }
        row++;
    }, 1);
}

PixelSorter.prototype.stop = function stop () {
    clearInterval(this[ROW_INTERVAL]);
    this[STEP_INTERVALS].forEach(({interval}) => clearInterval(interval));
    this[STEP_INTERVALS] = [];
    this[CURRENT_SORT] = null;
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
    return {gen, interval};
}

function getExchangeFunc (algorithm) {
    if (algorithm === MERGE) {
        return exchange.copyFromList;
    } else if (algorithm === BOGO) {
        return exchange.shuffle;
    } else {
        return exchange.indices;
    }
}

function getRow (row, raster) {
    const ret = []
    for (let i = 0; i < raster.width; i++) {
        ret.push(raster.getPixel(i, row));
    }
    return ret;
}

export default PixelSorter;
