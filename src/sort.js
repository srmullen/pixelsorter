import {sortBy} from "ramda";

/*
 * Exchange position of two elements in an array.
 */
export function exchange (arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

/* Topics to discuss */
// Sorting cost model - Compares, exchanges, array accesses.
// In place sorting or not?

export const ramdaSort = (comparator, list) => {
    return sortBy(comparator, list);
}

/*
 * Simple Sorts
 */

// Selection Sort
// Start by finding the element that should be the first in the sorted list and exchange it with the first element.
// Next find what should be the second element of the sorted list and exchange it with the second element.
// Continue until the list is sorted.
export function selection (comparator, list) {

}

// Insertion Sort

// Shell Sort

/*
 * Efficient Sorts
 */

// Merge Sort

// Heap Sort

// Quick Sort

/*
 * Distributed Sorts
 * - Maybe demo using web workers.
 */

// Counting Sort

// Bucket Sort

// Radix Sort
