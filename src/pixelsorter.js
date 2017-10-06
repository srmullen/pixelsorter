import * as selection from "sort/selection";
import * as insertion from "sort/insertion";
import * as bubble from "sort/bubble";
import * as shell from "sort/shell";
import * as merge from "sort/merge";
import * as quick from "sort/quick";

// Why does this run faster with a timeout than with a 'for' loop?
export function sort (exchange, compare, raster, options={}) {
    let row = 0;
    const interval = setInterval(() => {
        sortRow(exchange(row), compare, raster, row);
        if (row > raster.height) {
            clearInterval(interval);
        }
        row++;
    }, 1);
}

function sortRow (exchange, compare, raster, rowIndex) {
    const row = getRow(rowIndex, raster);
    // selection.sort(exchange, compare, row);
    const gen = new selection.step(exchange, compare, row);
    const interval = setInterval(() => {
        const {done} = gen.next();
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
