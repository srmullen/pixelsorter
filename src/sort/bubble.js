import {curry, identity} from "ramda";

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
export const sort = curry((exchange, compare, list) => {
    let sorted = false;
    let bubbleTo = list.length - 1;
    while (!sorted) {
        let exchanges = 0;
        for (let i = 0; i < bubbleTo; i++) {
            if (compare(list[i], list[i+1]) > 0) {
                exchange(list, i, i+1);
                exchanges++;
            }
        }
        if (exchanges === 0) sorted = true;
        bubbleTo--;
    }
    return list;
});

function* demo_gen (exchange, compare, list) {
    let sorted = false;
    // The largest element will bubble to the top of the list on each pass,
    // so each pass requires less bubbling.
    let bubbleTo = list.length - 1;
    while (!sorted) {
        let exchanges = 0;
        // yield {exchanges};
        for (let i = 0; i < bubbleTo; i++) {
            yield {compare: [i, i+1]};
            if (compare(list[i], list[i+1]) > 0) {
                exchange(list, i, i+1);
                exchanges++;
                // Copy the list before yielding so future changes don't affect saved list state.
                yield {list: list.map(identity), exchanges};
            }
        }
        if (exchanges === 0) sorted = true;
        bubbleTo--;
        yield {bubbleTo, exchanges: 0, compare: []};
    }
    yield {list: list.map(identity)};
};

function* step_gen (exchange, compare, list) {
    let sorted = false;
    let bubbleTo = list.length - 1;
    while (!sorted) {
        let exchanges = 0;
        for (let i = 0; i < bubbleTo; i++) {
            if (compare(list[i], list[i+1]) > 0) {
                exchange(list, i, i+1);
                yield {list};
                exchanges++;
            }
        }
        if (exchanges === 0) sorted = true;
        bubbleTo--;
    }
    return list;
};

export const demo = curry(demo_gen);
export const step = curry(step_gen);
