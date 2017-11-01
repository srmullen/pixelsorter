import {curry, identity} from 'ramda';
import * as counting from "./counting";

export const sort = curry((max, key, list) => {
    for (let i = 1; Math.floor(max/i) > 0; i = i * 10) {
        counting.sort(10, (el) => {
            const n = key(el);
            return Math.floor(n/i) % 10;
        }, list);
    }
});
