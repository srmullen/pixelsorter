import {exchange} from "./exchange";
import {sort as insertion} from "./insertion";

// Merge Sort
// The first sort algorithm which we'll look at that is not 'in place'. It is a recursive
// algorithm so it builds on the call stack, but it guarantees sort times of O(n log n).
// It works by splitting the list into two, sorting each list individually, and then mergi the lists together.
// The list splitting happens recursivly until each list contains only one element before the mergin begines.
// Larger lists are merged as the algorithm works its way back up the call stack.
//
// Split and merge functions are defined seperately here to be recursivly called.

// Splits the list into two lists.
function split (list) {
    const len = Math.floor(list.length/2);
    return [list.slice(0, len), list.slice(len)];
}

function mrg (compare, l1, l2) {
    // Use insertion sort to merge the lists back together.
    return insertion(compare, [...l1, ...l2]);
}

function _merge (compare, list) {
    if (list.length > 1) {
        const [l1, l2] = split(list);
        const m1 = _merge(compare, l1);
        const m2 = _merge(compare, l2);
        return mrg(compare, m1, m2);
    } else {
        return list;
    }
}

// Not-in-place
export function sort (compare, list) {
    if (list.length <= 1) {
        // If list requires no sorting just return it as a new list.
        // This is to be consistent in not returning the same list.
        return list.map(i => i);
    } else {
        return _merge(compare, list);
    }
}

// export function sort (compare, list) {
//
// }
