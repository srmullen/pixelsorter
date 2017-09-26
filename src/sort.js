import {sortBy} from "ramda";

/*
 * return the minimum item in a list according to a comparator.
 */
export function min (compare, list) {
    return list.reduce((min, el) => {
        const comparison = compare(min, el);
        if (comparison <= 0) {
            return min;
        } else {
            return el;
        }
    }, Infinity);
}

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
export function selection (compare, list) {
    for (let i = 0; i < list.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < list.length; j++) {
            const comparison = compare(list[min], list[j]);
            if (comparison > 0) {
                min = j;
            }
        }
        // Exchange positions if not already in the correct location.
        if (min !== i) exchange(list, min, i);
    }
    // Return the list even though it's mutatated so algorithms can be easily interchanged in pixel sorter.
    return list;
}

// Insertion Sort
// Iterate through the list. For each element place it in the correct place in a new list.
// Insertions are expensive because it requires shifting elements in the list.
export function insert (list, el, index) {
    for (let i = list.length - 1; i >= index; i--) {
        list[i + 1] = list[i];
    }
    list[index] = el;
};

export function insertion (compare, list) {
    // Create an array that will hold the sorted elements. The first element of
    // the list will always start at sorted[0].
    const sorted = [list[0]];
    for (let i = 1; i < list.length; i++) {
        // Element tthat will be insterted into the sorted list.
        const el = list[i];
        // find the position to insert;
        const sortedIndex = sorted.findIndex(s => compare(el, s) < 0);
        // Insert item at the end of list if not smaller than any already sorted elements.
        insert(sorted, el, sortedIndex === -1 ? sorted.length : sortedIndex);
    }
    return sorted;
}

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
