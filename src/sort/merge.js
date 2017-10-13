import {curry} from "ramda";
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
function _split (list) {
    const len = Math.floor(list.length/2);
    return [list.slice(0, len), list.slice(len)];
}

function _mrg (compare, l1, l2) {
    // Use insertion sort to merge the lists back together.
    return insertion(compare, [...l1, ...l2]);
}

function _merge (compare, list) {
    if (list.length > 1) {
        const [l1, l2] = _split(list);
        const m1 = _merge(compare, l1);
        const m2 = _merge(compare, l2);
        return _mrg(compare, m1, m2);
    } else {
        return list;
    }
}

// Not-in-place
export function _sort (compare, list) {
    if (list.length <= 1) {
        // If list requires no sorting just return it as a new list.
        // This is to be consistent in not returning the same list.
        return list.map(i => i);
    } else {
        return _merge(compare, list);
    }
}

// in-place
export const sort = curry((exchange, compare, list) => {
    function merge (list, low, mid, high) {
        // copy the relevant part of the list.
        const copy = [];
        for (let i = low; i < high; i++) {
            copy[i] = list[i];
        }

        let i1 = low; // first sorted list index.
        let i2 = mid; // second sorted list index.
        for (let i = low; i < high; i++) {
            // When the mid/high list is exhausted can just take the rest of the low/mid list...
            if (i2 >= high) {
                exchange(copy, list, i1, i);
                i1++;
            // and viceversa.
            } else if (i1 >= mid) {
                exchange(copy, list, i2, i);
                i2++;
            } else if (compare(copy[i1], copy[i2]) <= 0) {
                // take the smaller element and place it at position i.
                exchange(copy, list, i1, i);
                // The element from the first list is now used to increase its index.
                i1++;
            } else {
                exchange(copy, list, i2, i);
                i2++;
            }
        }
    }

    function splitMerge (list, low, high) {
        if (high <= low + 1) return;
        const mid = low + Math.floor((high - low) / 2);
        splitMerge(list, low, mid);
        splitMerge(list, mid, high);
        merge(list, low, mid, high);
    }

    splitMerge(list, 0, list.length);
    // return list;
});

function* demo_gen (exchange, compare, list) {
    function* merge (list, low, mid, high) {
        // copy the relevant part of the list.
        const copy = [];
        for (let i = low; i < high; i++) {
            copy[i] = list[i];
        }

        let i1 = low; // first sorted list index.
        let i2 = mid; // second sorted list index.
        for (let i = low; i < high; i++) {
            // When the mid/high list is exhausted can just take the rest of the low/mid list...
            if (i2 >= high) {
                exchange(copy, list, i1, i);
                i1++;
            // and viceversa.
            } else if (i1 >= mid) {
                exchange(copy, list, i2, i);
                i2++;
            } else if (yield {compare: [i1, i2]}, compare(copy[i1], copy[i2]) <= 0) {
                // take the smaller element and place it at position i.
                exchange(copy, list, i1, i);
                // The element from the first list is now used to increase its index.
                i1++;
            } else {
                exchange(copy, list, i2, i);
                i2++;
            }
        }
        yield {list};
    }

    function* splitMerge (list, low, high) {
        if (high <= low + 1) return;
        const mid = low + Math.floor((high - low) / 2);

        for (let v of splitMerge(list, low, mid)) {
            yield v;
        }

        for (let v of splitMerge(list, mid, high)) {
            yield v;
        }

        for (let v of merge(list, low, mid, high)) {
            yield v;
        }
    }

    for (let v of splitMerge(list, 0, list.length)) {
        yield v;
    }
    return list;
};

function* step_gen (exchange, compare, list) {
    function* merge (list, low, mid, high) {
        // copy the relevant part of the list.
        const copy = [];
        for (let i = low; i < high; i++) {
            copy[i] = list[i];
        }

        let i1 = low; // first sorted list index.
        let i2 = mid; // second sorted list index.
        for (let i = low; i < high; i++) {
            // When the mid/high list is exhausted can just take the rest of the low/mid list...
            if (i2 >= high) {
                exchange(copy, list, i1, i);
                i1++;
            // and viceversa.
            } else if (i1 >= mid) {
                exchange(copy, list, i2, i);
                i2++;
            } else if (compare(copy[i1], copy[i2]) <= 0) {
                // take the smaller element and place it at position i.
                exchange(copy, list, i1, i);
                // The element from the first list is now used to increase its index.
                i1++;
            } else {
                exchange(copy, list, i2, i);
                i2++;
            }
            yield {list};
        }
    }

    function* splitMerge (list, low, high) {
        if (high <= low + 1) return;
        const mid = low + Math.floor((high - low) / 2);

        for (let v of splitMerge(list, low, mid)) {
            yield v;
        }

        for (let v of splitMerge(list, mid, high)) {
            yield v;
        }

        for (let v of merge(list, low, mid, high)) {
            yield v;
        }
    }

    for (let v of splitMerge(list, 0, list.length)) {
        yield v;
    }
    return list;
};

export const demo = curry(demo_gen);
export const step = curry(step_gen);
