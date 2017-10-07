import {expect} from "chai";
import {prop, map, identity, sortBy} from "ramda";
import {indices as exchange, copyFromList} from "../src/sort/exchange";
import * as compare from "../src/compare";
import * as selection from "../src/sort/selection";
import * as insertion from "../src/sort/insertion";
import * as bubble from "../src/sort/bubble";
import * as shell from "../src/sort/shell";
import * as merge from "../src/sort/merge";
import * as heap from "../src/sort/heap";
import * as quick from "../src/sort/quick";

function listOf (randFn, length) {
    const ret = [];
    for (let i = 0; i < length; i++) {
        ret.push(randFn());
    }
    return ret;
}

const RANDS_LENGTH = 20;

const getRands = (() => {
    // Save the list in a closure to avoid modifying it.
    let list = null;
    return () => {
        if (list) {
            // Copy the list and return it. Safe to just return references to list contents rather than copying them
            // because we are only sorting and not modifying list elements.
            return map(identity, list);
        } else {
            // Assign the list and return a copy.
            list = listOf(() => ({val: Math.floor(Math.random() * 10)}), RANDS_LENGTH);
            return map(identity, list);
        }
    }
})();

const ramdaSort = (comparator, list) => {
    return sortBy(comparator, list);
}

describe("exchange", () => {
    it("should switch the elements at the given indices", () => {
        const list = [1,2,3];
        exchange(list, 0, 2);
        expect(list[0]).to.equal(3);
        expect(list[1]).to.equal(2);
        expect(list[2]).to.equal(1);
    });
});

describe("insert", () => {
    it("should place the item in the list at index. Items to the right should shift over", () => {
        const list = [1, 2, 3, 4, 5];
        insertion.insert(list, "hello", 0);
        expect(list).to.eql(["hello", 1, 2, 3, 4, 5]);
        insertion.insert(list, "goodbye", 6);
        expect(list).to.eql(["hello", 1, 2, 3, 4, 5, "goodbye"]);
        insertion.insert(list, "middle", 3);
        expect(list).to.eql(["hello", 1, 2, "middle", 3, 4, 5, "goodbye"]);
    });
});

describe("getRands", () => {
    it(`should return a list of ${RANDS_LENGTH} objects`, () => {
        expect(getRands().length).to.equal(RANDS_LENGTH);
    });

    it("should return identical lists every time it is called", () => {
        const rands1 = getRands();
        const rands2 = getRands();
        for (let i = 0; i < rands.length; i++) {
            expect(rands1[i].val).to.equal(rands2[i].val);
        }
    });

    it("shouldn't be affected by exchange calls", () => {
        const rands1 = getRands();
        exchange(rands1, 0, 1);
        const rands2 = getRands();
        expect(rands2[0]).to.equal(rands1[1]);
        expect(rands2[1]).to.equal(rands1[0]);
    });
});

const rands = getRands();
console.log(rands);
const expected = ramdaSort(prop("val"), rands);
describe("Sorting", () => {
    describe("ramda sort", () => {
        it("should sort", function () {
            for (let i = 0; i < rands.length-1; i++) {
                expect(expected[i].val <= expected[i+1].val).to.be.ok;
            }
        });
    });

    describe("Selection Sort", () => {
        it("should sort", () => {
            const rands = getRands();
            const sorted = selection.sort(exchange, (a, b) => compare.number(a.val, b.val), rands);
            for(let i = 0; i < expected.length; i++) {
                expect(sorted[i].val).to.equal(expected[i].val);
            }
        });
    });

    describe("Insertion Sort", () => {
        it("should sort", () => {
            const rands = getRands();
            const sorted = insertion.sort(exchange, (a, b) => compare.number(a.val, b.val), rands);
            for(let i = 0; i < expected.length; i++) {
                expect(sorted[i].val).to.equal(expected[i].val);
            }
        });
    });

    describe("Bubble Sort", () => {
        it("should sort", () => {
            const rands = getRands();
            const sorted = bubble.sort(exchange, (a, b) => compare.number(a.val, b.val), rands);
            for(let i = 0; i < expected.length; i++) {
                expect(sorted[i].val).to.equal(expected[i].val);
            }
        });
    });

    describe("Shell Sort", () => {
        it("should sort", () => {
            const rands = getRands();
            const sorted = shell.sort(exchange, (a, b) => compare.number(a.val, b.val), rands);
            for(let i = 0; i < expected.length; i++) {
                expect(sorted[i].val).to.equal(expected[i].val);
            }
        });
    });

    describe("Merge Sort", () => {
        it("should sort", () => {
            const rands = getRands();
            const sorted = merge.sort(copyFromList, (a, b) => compare.number(a.val, b.val), rands);
            for(let i = 0; i < expected.length; i++) {
                expect(sorted[i].val).to.equal(expected[i].val);
            }
        });
    });

    describe("Quick Sort", () => {
        it("should sort", () => {
            const rands = getRands();
            const sorted = quick.sort(exchange, (a, b) => compare.number(a.val, b.val), rands);
            for(let i = 0; i < expected.length; i++) {
                expect(sorted[i].val).to.equal(expected[i].val);
            }
        });
    });

    xdescribe("Heap Sort", () => {
        it("should sort", () => {
            const rands = getRands();
            const sorted = heap.sort(exchange, (a, b) => compare.number(a.val, b.val), rands);
            for(let i = 0; i < expected.length; i++) {
                expect(sorted[i].val).to.equal(expected[i].val);
            }
        });
    });
});
