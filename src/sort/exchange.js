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
 * Places the item at the given position in the array and returns the item
 * that was previously at the position.
 */
export function swapOut (arr, pos, item) {
    const prev = arr[pos];
    arr[pos] = item;
    return prev;
}

/*
 * Copys the index from one list into another list.
 * Does not mutate the copy list.
 */
export function copyFromList(copy, into, copyIndex, intoIndex) {
    into[intoIndex] = copy[copyIndex];
}

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
