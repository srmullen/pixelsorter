import {curry} from "ramda";
/*
 * Exchange position of two elements in an array.
 */
export function indices (arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

/*
 * Copys the index from one list into another list.
 * Does not mutate the copy list.
 */
export function copyFromList(copy, into, copyIndex, intoIndex) {
    into[intoIndex] = copy[copyIndex];
}

/*
 * Wrap the exchange function so that the pixel of the raster change everytime there
 * is and exchange.
 */
export const pixels = curry((exchange, raster, row) => {
    if (exchange === indices) {
        return (arr, a, b) => {
            exchange(arr, a, b);
            const temp = raster.getPixel(a, row);
            raster.setPixel(a, row, raster.getPixel(b, row));
            raster.setPixel(b, row, temp);
        }
    } else if (exchange === copyFromList) {
        return (copy, arr, a, b) => {
            exchange(copy, arr, a, b);
            raster.setPixel(b, row, arr[b]);
        }
    } else if (exchange === shuffle) {
        return (arr) => {
            exchange(arr);
            // const temp = raster.getPixel(a, row);
            // raster.setPixel(a, row, raster.getPixel(b, row));
            // raster.setPixel(b, row, temp);
            arr.forEach((pixel, i) => {
                raster.setPixel(i, row, pixel);
            });
        }
    }
});

export function step (exchange) {
    return function* (arr, a, b) {
        exchange(arr, a, b);
        yield {list: arr};
    }
}

export function shuffle (a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
