import * as selection from "sort/selection";
import * as insertion from "sort/insertion";
import * as bubble from "sort/bubble";
import * as shell from "sort/shell";
import * as merge from "sort/merge";
import * as quick from "sort/quick";

// Why does this run faster with a timeout than with a 'for' loop?
export function sort (exchange, compare, raster) {
    let row = 0;
    const interval = setInterval(() => {
        sortRow(exchange(row), compare, raster, row);
        if (row > raster.height) {
            clearInterval(interval)
        }
        row++;
    }, 10);
}

function sortRow (exchange, compare, raster, rowIndex) {
    const row = getRow(rowIndex, raster);
    selection.sort(exchange, compare, row);
}

function getRow (row, raster) {
    const ret = []
    for (let i = 0; i < raster.width; i++) {
        ret.push(raster.getPixel(i, row));
    }
    return ret;
}
