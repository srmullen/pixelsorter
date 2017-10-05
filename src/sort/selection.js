import {curry} from "ramda";

// Selection Sort
// Start by finding the element that should be the first in the sorted list and exchange it with the first element.
// Next find what should be the second element of the sorted list and exchange it with the second element.
// Continue until the list is sorted.
export const sort = curry((exchange, compare, list) => {
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
});

// Using generators to observe Sorts in action.
function* generator (exchange, compare, list) {
    for (let i = 0; i < list.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < list.length; j++) {
            yield {compare: [min, j]};
            const comparison = compare(list[min], list[j]);
            if (comparison > 0) {
                min = j;
            }
        }
        // Exchange positions if not already in the correct location.
        if (min !== i) {
            exchange(list, min, i);
            yield {list};
        }
    }
    // Return the list even though it's mutatated so algorithms can be easily interchanged in pixel sorter.
    return list;
};

export const gen = curry(generator);
