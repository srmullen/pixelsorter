import {curry, identity} from 'ramda';

// In-place unstable sorting algorithm that is theoretically optimal in terms of
// the total number of writes to the original array.
// It is based on the idea that the sorting can be broken into cycles. A cycle is
// comprised of a set of items that move to take each others place.
// A cycle is created by moving an element to its correct position. The element
// that was in that position is then moved to its correct position. This continues
// until the elements of the cycle are all correct. Then move on to the next cycle.
export const sort = curry((exchange, compare, list) => {
    for (let cycle = 0; cycle < list.length - 2; cycle++) {
        let item = list[cycle];
        let pos = cycle;

        for (let i = cycle + 1; i < list.length; i++) {
            if (compare(item, list[i]) > 0) {
                pos++;
            }
        }

        // Item is in correct position.
        if (pos === cycle) continue;

        // Skip over duplicate items
        while (pos < list.length && compare(item, list[pos]) === 0) {
            pos++;
        }

        if (pos !== cycle) {
            item = exchange(list, pos, item);

            while (pos !== cycle) {
                pos = cycle;
                for (let i = cycle + 1; i < list.length; i++) {
                    if (compare(item, list[i]) > 0) {
                        pos++;
                    }
                }

                // Skip over duplicate items
                while(pos < list.length && compare(item, list[pos]) === 0) {
                    pos++;
                }

                if (compare(item, list[pos]) !== 0) {
                    item = exchange(list, pos, item);
                }
            }
        }
    }
});

function* step_gen (exchange, compare, list) {
    for (let cycle = 0; cycle < list.length - 2; cycle++) {
        let item = list[cycle];
        let pos = cycle;

        for (let i = cycle + 1; i < list.length; i++) {
            if (compare(item, list[i]) > 0) {
                pos++;
            }
        }

        // Item is in correct position.
        if (pos === cycle) continue;

        // Skip over duplicate items
        while (pos < list.length && compare(item, list[pos]) === 0) {
            pos++;
        }

        if (pos !== cycle) {
            item = exchange(list, pos, item);
            yield {list};

            while (pos !== cycle) {
                pos = cycle;
                for (let i = cycle + 1; i < list.length; i++) {
                    if (compare(item, list[i]) > 0) {
                        pos++;
                    }
                }

                // Skip over duplicate items
                while(pos < list.length && compare(item, list[pos]) === 0) {
                    pos++;
                }

                if (compare(item, list[pos]) !== 0) {
                    item = exchange(list, pos, item);
                    yield {list};
                }
            }
        }
    }
}

export const step = curry(step_gen);
