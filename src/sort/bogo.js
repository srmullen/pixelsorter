import {curry, identity} from "ramda";

// Not Testing this because it is not deterministic or gauranteed to finish.
// Bogo sort
// Shuffle the list randomly and check to see if it is sorted. It's worst-case
// performance knows no bound! Could theoretically never stop running.
// Average case performance is O((n+1)!) so only run with small lists.
export const sort = curry((shuffle, compare, list) => {
    const isSorted = list => {
        for (let i = 0; i < list.length-1; i++) {
            if (compare(list[i], list[i+1]) > 0) {
                return false;
            }
        }
        return true;
    }

    // check if already sorted.
    let sorted = isSorted(list);
    while (!sorted) {
        shuffle(list);
        sorted = isSorted(list);
    }

    return list;
});

function* demo_gen (shuffle, compare, list) {
    let sorted = false;

    for (let i = 0; i < list.length-1; i++) {
        yield {compare: [i, i+1]};
        if (compare(list[i], list[i+1]) > 0) {
            sorted = false;
            break;
        }
        // if it gets through the whole list then the list is sorted
        sorted = true;
    }
    while (!sorted) {
        shuffle(list);
        yield {list: list.map(identity), compare: []};

        for (let i = 0; i < list.length-1; i++) {
            yield {compare: [i, i+1]};
            if (compare(list[i], list[i+1]) > 0) {
                sorted = false;
                break;
            }
            // if it gets through the whole list then the list is sorted
            sorted = true;
        }
    }
    yield {list};
}

export const demo = curry(demo_gen);
