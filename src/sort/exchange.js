import {curry} from "ramda";
import {
    HORIZONTAL, VERTICAL, LEFT_TO_RIGHT, RIGHT_TO_LEFT, TOP_TO_BOTTOM, BOTTOM_TO_TOP
} from "root/constants";
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
export const pixels = curry((exchange, raster, direction, index) => {
    if (direction === LEFT_TO_RIGHT) {
        if (exchange === indices) {
            return (arr, a, b) => {
                exchange(arr, a, b);
                const temp = raster.getPixel(a, index);
                raster.setPixel(a, index, raster.getPixel(b, index));
                raster.setPixel(b, index, temp);
            }
        } else if (exchange === copyFromList) {
            return (copy, arr, a, b) => {
                exchange(copy, arr, a, b);
                raster.setPixel(b, index, arr[b]);
            }
        } else if (exchange === shuffle) {
            return (arr) => {
                exchange(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(i, index, pixel);
                });
            }
        }
    } else if (direction === RIGHT_TO_LEFT) {
        if (exchange === indices) {
            return (arr, a, b) => {
                const length = arr.length - 1;
                exchange(arr, a, b);
                const temp = raster.getPixel(length - a, index);
                raster.setPixel(length - a, index, raster.getPixel(length - b, index));
                raster.setPixel(length - b, index, temp);
            }
        } else if (exchange === copyFromList) {
            return (copy, arr, a, b) => {
                const length = arr.length - 1;
                exchange(copy, arr, a, b);
                raster.setPixel(length - b, index, arr[b]);
            }
        } else if (exchange === shuffle) {
            return (arr) => {
                const length = arr.length - 1;
                exchange(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(length - i, index, pixel);
                });
            }
        }
    } else if (direction === TOP_TO_BOTTOM) {
        if (exchange === indices) {
            return (arr, a, b) => {
                exchange(arr, a, b);
                const temp = raster.getPixel(index, a);
                raster.setPixel(index, a, raster.getPixel(index, b));
                raster.setPixel(index, b, temp);
            }
        } else if (exchange === copyFromList) {
            return (copy, arr, a, b) => {
                exchange(copy, arr, a, b);
                raster.setPixel(index, b, arr[b]);
            }
        } else if (exchange === shuffle) {
            return (arr) => {
                exchange(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(index, i, pixel);
                });
            }
        }
    } else if (direction === BOTTOM_TO_TOP) {
        if (exchange === indices) {
            return (arr, a, b) => {
                const length = arr.length - 1;
                exchange(arr, a, b);
                const temp = raster.getPixel(index, length - a);
                raster.setPixel(index, length - a, raster.getPixel(index, length - b));
                raster.setPixel(index, length - b, temp);
            }
        } else if (exchange === copyFromList) {
            return (copy, arr, a, b) => {
                exchange(copy, arr, a, b);
                raster.setPixel(index, arr.length - 1 - b, arr[b]);
            }
        } else if (exchange === shuffle) {
            return (arr) => {
                const length = arr.length - 1;
                exchange(arr);
                arr.forEach((pixel, i) => {
                    raster.setPixel(index, length - i, pixel);
                });
            }
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
