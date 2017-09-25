import {expect} from "chai";
import {prop, map, identity} from "ramda";
import {ramdaSort, exchange} from "../src/sort";
import * as compare from "../src/compare";

function listOf (randFn, length) {
    const ret = [];
    for (let i = 0; i < length; i++) {
        ret.push(randFn());
    }
    return ret;
}

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
            list = listOf(() => ({val: Math.floor(Math.random() * 10)}), 20);
            return map(identity, list);
        }
    }
})();

describe("exchange", () => {
    it("should switch the elements at the given indices", () => {
        const list = [1,2,3];
        exchange(list, 0, 2);
        expect(list[0]).to.equal(3);
        expect(list[1]).to.equal(2);
        expect(list[2]).to.equal(1);
    });
});

describe("getRands", () => {
    it("should return a list of 20 objects", () => {
        expect(getRands().length).to.equal(20);
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
const expected = ramdaSort(prop("val"), rands);
describe("Sorting", () => {
    describe("ramda sort", () => {
        it("should sort", function () {
            for (let i = 0; i < rands.length-1; i++) {
                expect(expected[i].val <= expected[i+1].val).to.be.ok;
            }
        });
    });
});
