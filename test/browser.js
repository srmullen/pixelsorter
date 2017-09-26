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
import * as sort from "../src/sort";

export const selection = () => {
    const list = [{val: 4}, {val: 3}, {val: 7}, {val: 8}, {val: 2}, {val: 10}];
    // sort.selection(compose(compare.number, prop("val")), list);
    sort.selection((a, b) => compare.number(a.val, b.val), list);
    return list;
}
