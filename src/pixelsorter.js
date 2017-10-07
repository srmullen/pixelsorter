import * as selection from "sort/selection";
import * as insertion from "sort/insertion";
import * as bubble from "sort/bubble";
import * as shell from "sort/shell";
import * as merge from "sort/merge";
import * as quick from "sort/quick";
import * as exchange from "sort/exchange";
import {SELECTION, INSERTION, BUBBLE, SHELL, MERGE, QUICK} from "root/constants";

const sorts = {
    [SELECTION]: selection,
    [INSERTION]: insertion,
    [BUBBLE]: bubble,
    [SHELL]: shell,
    [MERGE]: merge,
    [QUICK]: quick
};

// Why does this run faster with a timeout than with a 'for' loop?
export function sort (compare, raster, options={sort: INSERTION}) {
    let row = 0;
    const exchangeFn = options.sort === MERGE ? exchange.copyFromList : exchange.indices;
    const interval = setInterval(() => {
        sortRow(options, exchange.pixels(exchangeFn, raster, row), compare, raster, row);
        if (row > raster.height) {
            clearInterval(interval);
        }
        row++;
    }, 1);
}

function sortRow (options, exchange, compare, raster, rowIndex) {
    const row = getRow(rowIndex, raster);
    // selection.sort(exchange, compare, row);
    const gen = new sorts[options.sort].step(exchange, compare, row);
    const interval = setInterval(() => {
        const {value, done} = gen.next();
        if (done) {
            clearInterval(interval);
        }
    }, 1);
}

function getRow (row, raster) {
    const ret = []
    for (let i = 0; i < raster.width; i++) {
        ret.push(raster.getPixel(i, row));
    }
    return ret;
}
