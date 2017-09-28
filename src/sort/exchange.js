/*
 * Exchange position of two elements in an array.
 */
export function exchange (arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
