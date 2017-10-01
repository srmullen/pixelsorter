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
import * as selection from "../src/sort/selection";
import * as insertion from "../src/sort/insertion";
import * as bubble from "../src/sort/bubble";
import * as shell from "../src/sort/shell";
import * as merge from "../src/sort/merge";
import * as heap from "../src/sort/heap";

export const selectionsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    const sorted = selection.sort((a, b) => compare.number(a.val, b.val), list);
    return sorted;
}

export const insertionsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    const sorted = insertion.sort((a, b) => compare.number(a.val, b.val), list);
    return sorted;
}


export const bubblesort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    const sorted = bubble.sort((a, b) => compare.number(a.val, b.val), list);
    return sorted;
}

export const shellsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    const sorted = shell.sort((a, b) => compare.number(a.val, b.val), list);
    return sorted;
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
    const sorted = merge.sort((a, b) => compare.number(a.val, b.val), list);
    return sorted;
}

export const heapsort = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    const sorted = heap.sort((a, b) => compare.number(a.val, b.val), list);
    return sorted;
}
