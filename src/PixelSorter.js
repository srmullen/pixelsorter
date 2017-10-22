import {curry} from "ramda";
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
    RUNNING, PAUSED, NOT_RUNNING,
    HORIZONTAL, VERTICAL, LEFT_TO_RIGHT, RIGHT_TO_LEFT, TOP_TO_BOTTOM, BOTTOM_TO_TOP
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

const AREA_INTERVAL = Symbol("AREA_INTERVAL");
const STEP_INTERVALS = Symbol("STEP_INTERVALS");
const CURRENT_SORT = Symbol("CURRENT_SORT");

function PixelSorter (raster) {
    this.raster = raster;
    this[AREA_INTERVAL] = null;
    this[STEP_INTERVALS] = [];
    this[CURRENT_SORT] = null;
}

// Why does this run faster with a timeout than with a 'for' loop?
PixelSorter.prototype.run = function run (compare, raster, options = {algorithm: INSERTION, direction: LEFT_TO_RIGHT}) {
    let listIndex = 0;
    const size = getSize(this.raster, options.direction);
    let sort;
    if (options.direction === LEFT_TO_RIGHT || options.direction === RIGHT_TO_LEFT) {
        sort = this.sortRow;
    } else {
        sort = this.sortColumn;
    }
    const exchangeFn = getExchangeFunc(options.algorithm);
    this[CURRENT_SORT] = {options, exchangeFn, compare, raster};
    this[AREA_INTERVAL] = setInterval(() => {
        this[STEP_INTERVALS].push(
            sort(options, exchangePixels(exchangeFn, raster, options.direction, listIndex), compare, raster, listIndex)
        );
        if (listIndex > size) {
            clearInterval(this[AREA_INTERVAL]);
        }
        listIndex++;
    }, 1);
}

PixelSorter.prototype.pause = function () {
    clearInterval(this[AREA_INTERVAL]);
    this[STEP_INTERVALS].forEach(({interval}) => clearInterval(interval));
}

PixelSorter.prototype.continue = function () {
    let listIndex = 0;
    const {options, exchangeFn, compare, raster} = this[CURRENT_SORT];
    const size = getSize(this.raster, options.direction);
    this[AREA_INTERVAL] = setInterval(() => {
        if (this[STEP_INTERVALS][listIndex]) {
            const {gen} = this[STEP_INTERVALS][listIndex];
            const interval = setInterval(() => {
                const {value, done} = gen.next();
                if (done) {
                    clearInterval(interval);
                }
            }, 1);
            this[STEP_INTERVALS][listIndex] = {gen, interval};
        } else {
            this[STEP_INTERVALS][listIndex] = this.sortRow(
                options, exchangePixels(exchangeFn, raster, options.direction, listIndex), compare, raster, listIndex
            );
        }
        if (listIndex > size) {
            clearInterval(this[AREA_INTERVAL]);
        }
        listIndex++;
    }, 1);
}

PixelSorter.prototype.stop = function stop () {
    clearInterval(this[AREA_INTERVAL]);
    this[STEP_INTERVALS].forEach(({interval}) => clearInterval(interval));
    this[STEP_INTERVALS] = [];
    this[CURRENT_SORT] = null;
};

PixelSorter.prototype.sortRow = function (options, exchange, compare, raster, rowIndex) {
    const row = getRow(rowIndex, raster);
    if (options.direction === RIGHT_TO_LEFT) {
        row.reverse();
    }
    const gen = new algorithms[options.algorithm].step(exchange, compare, row);
    const interval = setInterval(() => {
        const {value, done} = gen.next();
        if (done) {
            clearInterval(interval);
        }
    }, 1);
    return {gen, interval};
}

PixelSorter.prototype.sortColumn = function (options, exchange, compare, raster, columnIndex) {
    const column = getColumn(columnIndex, raster);
    if (options.direction === BOTTOM_TO_TOP) {
        column.reverse();
    }
    const gen = new algorithms[options.algorithm].step(exchange, compare, column);
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

function getSize (raster, direction) {
    if (direction === LEFT_TO_RIGHT || direction === RIGHT_TO_LEFT) {
        return raster.height;
    } else {
        return raster.width;
    }
}

function getRow (row, raster) {
    const ret = []
    for (let i = 0; i < raster.width; i++) {
        ret.push(raster.getPixel(i, row));
    }
    return ret;
}

function getColumn (column, raster) {
    const ret = []
    for (let i = 0; i < raster.height; i++) {
        ret.push(raster.getPixel(column, i));
    }
    return ret;
}

/*
 * Wrap the exchange function so that the pixel of the raster change everytime there
 * is and exchange.
 */
const exchangePixels = curry((exchangeFn, raster, direction, index) => {
    if (direction === LEFT_TO_RIGHT) {
        if (exchangeFn === exchange.indices) {
            return (arr, a, b) => {
                exchangeFn(arr, a, b);
                const temp = raster.getPixel(a, index);
                raster.setPixel(a, index, raster.getPixel(b, index));
                raster.setPixel(b, index, temp);
            }
        } else if (exchangeFn === exchange.copyFromList) {
            return (copy, arr, a, b) => {
                exchangeFn(copy, arr, a, b);
                raster.setPixel(b, index, arr[b]);
            }
        } else if (exchangeFn === exchange.shuffle) {
            return (arr) => {
                exchangeFn(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(i, index, pixel);
                });
            }
        }
    } else if (direction === RIGHT_TO_LEFT) {
        if (exchangeFn === exchange.indices) {
            return (arr, a, b) => {
                const length = arr.length - 1;
                exchangeFn(arr, a, b);
                const temp = raster.getPixel(length - a, index);
                raster.setPixel(length - a, index, raster.getPixel(length - b, index));
                raster.setPixel(length - b, index, temp);
            }
        } else if (exchangeFn === exchange.copyFromList) {
            return (copy, arr, a, b) => {
                const length = arr.length - 1;
                exchangeFn(copy, arr, a, b);
                raster.setPixel(length - b, index, arr[b]);
            }
        } else if (exchangeFn === exchange.shuffle) {
            return (arr) => {
                const length = arr.length - 1;
                exchangeFn(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(length - i, index, pixel);
                });
            }
        }
    } else if (direction === TOP_TO_BOTTOM) {
        if (exchangeFn === exchange.indices) {
            return (arr, a, b) => {
                exchangeFn(arr, a, b);
                const temp = raster.getPixel(index, a);
                raster.setPixel(index, a, raster.getPixel(index, b));
                raster.setPixel(index, b, temp);
            }
        } else if (exchangeFn === exchange.copyFromList) {
            return (copy, arr, a, b) => {
                exchangeFn(copy, arr, a, b);
                raster.setPixel(index, b, arr[b]);
            }
        } else if (exchangeFn === exchange.shuffle) {
            return (arr) => {
                exchangeFn(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(index, i, pixel);
                });
            }
        }
    } else if (direction === BOTTOM_TO_TOP) {
        if (exchangeFn === exchange.indices) {
            return (arr, a, b) => {
                const length = arr.length - 1;
                exchangeFn(arr, a, b);
                const temp = raster.getPixel(index, length - a);
                raster.setPixel(index, length - a, raster.getPixel(index, length - b));
                raster.setPixel(index, length - b, temp);
            }
        } else if (exchangeFn === exchange.copyFromList) {
            return (copy, arr, a, b) => {
                exchangeFn(copy, arr, a, b);
                raster.setPixel(index, arr.length - 1 - b, arr[b]);
            }
        } else if (exchangeFn === exchange.shuffle) {
            return (arr) => {
                const length = arr.length - 1;
                exchangeFn(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(index, length - i, pixel);
                });
            }
        }
    }
});

export default PixelSorter;
