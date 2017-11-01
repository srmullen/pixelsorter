// import "node_modules/mocha/mocha.css";
// import "node_modules/mocha/mocha";
// import "./sort";
//
// mocha.setup("tdd");
//
// console.log("tests");
//
// mocha.run();
import {prop, map, identity, compose} from "ramda";
import * as compare from "../src/compare";
import * as exchange from "../src/sort/exchange";
import * as selection from "../src/sort/selection";
import * as cycle from "../src/sort/cycle";
import * as insertion from "../src/sort/insertion";
import * as bubble from "../src/sort/bubble";
import * as comb from "../src/sort/comb";
import * as shell from "../src/sort/shell";
import * as counting from "../src/sort/counting";
import * as radix from "../src/sort/radix";
import * as merge from "../src/sort/merge";
import * as heap from "../src/sort/heap";
import * as quick from "../src/sort/quick";
import * as bogo from "../src/sort/bogo";

export const bogosort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    bogo.sort(exchange.shuffle, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const selectionsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    selection.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const cyclesort = () => {
    const list = [{ val: 7 },
                  { val: 1 },
                  { val: 4 },
                  { val: 5 },
                  { val: 1 },
                  { val: 6 },
                  { val: 1 },
                  { val: 0 },
                  { val: 1 },
                  { val: 4 },
                  { val: 3 },
                  { val: 0 },
                  { val: 4 },
                  { val: 3 },
                  { val: 6 },
                  { val: 0 },
                  { val: 1 },
                  { val: 8 },
                  { val: 8 },
                  { val: 9 }];
    cycle.sort(exchange.swapOut, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const insertionsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    insertion.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}


export const bubblesort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    bubble.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const combsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    comb.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const shellsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    shell.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const countingsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 4}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    const key = el => el.val;
    const max = Math.max(...list.map(key));
    counting.sort(max, key, list);
    return list.map(({val}) => val);
}

export const radixsort = () => {
    const list = [{val: 400}, {val: 3}, {val: 34}, {val: 7}, {val: 18}, {val: 2}, {val: 11}];
    const key = el => el.val;
    const max = Math.max(...list.map(key));
    radix.sort(max, key, list);
    return list.map(({val}) => val);
}

export const mergesort = () => {
    // const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    // const list = [{val: 4}, {val: 3}, {val: 7}, {val: 2}];
    const list = [ { val: 2 },
                  { val: 7 },
                  { val: 2 },
                  { val: 2 },
                  { val: 2 },
                  { val: 3 },
                  { val: 4 },
                  { val: 8 },
                  { val: 1 },
                  { val: 2 },
                  { val: 4 },
                  { val: 9 },
                  { val: 2 },
                  { val: 4 },
                  { val: 6 },
                  { val: 9 },
                  { val: 2 },
                  { val: 5 },
                  { val: 5 },
                  { val: 9 } ];
    merge.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const heapsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}, {val: 6}];
    heap.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}

export const quicksort = () => {
    // const list = [{val: 4}, {val: 3}, {val: 8}, {val: 7}, {val: 10}, {val: 2}, {val: 7}];
    const list = [
                  { val: 3 },
                  { val: 9 },
                  { val: 7 },
                  { val: 5 },
                  { val: 3 },
                  { val: 7 },
                  { val: 8 },
                  { val: 7 },
                  { val: 5 },
                  { val: 3 },
                  { val: 3 },
                  { val: 4 },
                  { val: 5 },
                  { val: 5 },
                  { val: 8 },
                  { val: 9 },
                  { val: 9 },
                  { val: 8 },
                  { val: 5 },
                  { val: 6 }
              ];
    quick.sort(exchange.indices, (a, b) => compare.number(a.val, b.val), list);
    return list.map(({val}) => val);
}
