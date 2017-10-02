import {curry} from "ramda";
/*
 * Exchange position of two elements in an array.
 */
export function indices (arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

export const pixels = curry((raster, row, arr, a, b) => {
    indices(arr, a, b);
    const temp = raster.getPixel(a, row);
    raster.setPixel(a, row, raster.getPixel(b, row));
    raster.setPixel(b, row, temp);
});
