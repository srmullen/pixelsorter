import {curry, identity} from "ramda";

export const sort = curry((exchange, compare, list) => {
    let sorted = false;
    let gap = Math.floor(list.length - 1);

    function nextGap (gap) {
        return gap - 1;
    }

    while(!sorted) {
        let swaps = 0;
        for (let i = 0; i < list.length - gap; i++) {
            if (compare(list[i], list[i+gap]) > 0) {
                exchange(list, i, i+gap);
                swaps++;
            }
        }

        if (gap === 1) {
            if (swaps === 0) sorted = true;
        } else {
            gap = nextGap(gap);
        }
    }
});
