import {curry, identity} from 'ramda';
import * as counting from "./counting";

// This radix sort only works for whole numbers.
// Need to fix to also work on decimals.
export const sort = curry((max, exchange, key, list) => {
    // Get the number to multiply by so numbers arent floats.
    const mult = Math.pow(10, list.reduce((acc, el) => {
        const [n, f] = key(el).toString().split(".");
        if (f && f.length > acc) {
            return f.length;
        } else {
            return acc;
        }
    }, 0));
    for (let i = 1; Math.floor((max * mult)/i) > 0; i = i * 10) {
        counting.sort(10, exchange, (el) => {
            const n = key(el) * mult;
            return Math.floor(n/i) % 10;
        }, list);
    }
});

function* step_gen (max, exchange, key, list) {
    // Get the number to multiply by so numbers arent floats.
    const mult = Math.pow(10, list.reduce((acc, el) => {
        const [n, f] = key(el).toString().split(".");
        if (f && f.length > acc) {
            return f.length;
        } else {
            return acc;
        }
    }, 0));
    for (let i = 1; Math.floor((max * mult)/i) > 0; i = i * 10) {
        for(let v of counting.step(10, exchange, (el) => {
            const n = key(el) * mult;
            return Math.floor(n/i) % 10;
        }, list)) {
            yield v;
        }
    }
}

export const step = curry(step_gen);
