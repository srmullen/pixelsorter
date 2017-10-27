import {curry, identity, last, reduce, filter} from 'ramda';

// Counting sort deals with sorting of keys in a specific range.
// Rather than using a traditional comparator here, the key (compare) function
// should return the key of the item in the list. The key should be an
// index into the counts array.
export const sort = curry((key, list) => {
    // get the max key
    const max = Math.max(...list.map(key));
    // Store the count of each unique object in the list.
    let counts = [];
    for (let i = 0; i <= max; i++) {
        counts[i] = {els: []};
    }

    for (let i = 0; i < list.length; i++) {
        const count = counts[key(list[i])];
        count.els.push(list[i]);
    }

    const out = []
    for (let i = 0; i < counts.length; i++) {
        for (let j = 0; j < counts[i].els.length; j++) {
            out.push(counts[i].els[j]);
        }
    }

    for (let i = 0; i < list.length; i++) {
        list[i] = out[i];
    }
});
