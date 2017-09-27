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

// Helper function for inserting elements. How to measure cost? Number of items shifted?
// Maybe implement in terms of exchange to keep counting consistent.
export function insert (list, el, index) {
    for (let i = list.length - 1; i >= index; i--) {
        list[i + 1] = list[i];
    }
    list[index] = el;
};

// without mutation
export function _insertion (compare, list) {
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

// Insertion sort with mutation.
export function insertion (compare, list) {
    for (let i = 0; i < list.length; i++) {
        // Move backwards over the already sorted elements and continue swaping until
        // newest element is in the correct location.
        for (let j = i; j > 0 && compare(list[j], list[j-1]) < 0; j--) {
            exchange(list, j, j-1);
        }
    }
    return list;
}

// Bubble Sort
// I wasn't going to include this originally because Obama says it's not
// the way to go (https://www.youtube.com/watch?v=k4RRi_ntQc8), but it could be
// an interesting visualization.
//
// Start by comparing the first two elements of the list. Swap them if needed.
// Continue through the list swapping adjacent elements whenever need.
// When the end of the list is reached, if no swaps occured then the list is sorted.
// If there were swaps go back to the beginning of the list and repeat the process until
// the list is passed over with no swaps.
//
// Bubble sort isn't doing as bad as I thought it would compared to
// selection/insertion sort in initial tests during implementation.
// Image being tested on has a 576 pixel width. Sorting one row takes ~269ms.
// Insertion sort ~236ms.
// Selection sort ~245ms.
export function bubble (compare, list) {
    let sorted = false;
    while (!sorted) {
        let exchanges = 0;
        for (let i = 0; i < list.length-1; i++) {
            if (compare(list[i], list[i+1]) > 0) {
                exchange(list, i, i+1);
                exchanges++;
            }
        }
        if (exchanges === 0) sorted = true;
    }
    return list;
}

// Shell Sort
// Similar to insertion sort but instead of only comparing adjacent elements it compares,
// elements at a predefined gap, reducing the gap on each pass. A final pass with a gap of 1
// ensures that the list will be correctly sorted.
// The idea is that by starting out comparing elements far apart can help them move to their correctly
// location with less exchanges. Will this hold true in experimentation?
// Choosing gap sequences is a problem I won't look at. Try a couple popular ones and look
// for asthetically pleasing sequences when animating the sort.
export function shell (compare, list) {
    // Use the experimentally derived Ciura sequence, from the Shell Sort Wikipedia entry.
    const gapSeq = [701, 301, 132, 57, 23, 10, 4, 1];
    // There's no need to sort gaps larger than the list so find the gap to use.
    let gapIndex = gapSeq.findIndex(n => n < list.length);
    while (gapIndex < gapSeq.length) {
        const gap = gapSeq[gapIndex];
        for (let i = gap; i < list.length; i++) {
            for (let j = i; j >= gap && compare(list[j], list[j - gap]) < 0; j -= gap) {
                exchange(list, j, j - gap);
            }
        }
        gapIndex++;
    }
    return list;
}

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
