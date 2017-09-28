import {exchange} from "./exchange";

// Shell Sort
// Similar to insertion sort but instead of only comparing adjacent elements it compares,
// elements at a predefined gap, reducing the gap on each pass. A final pass with a gap of 1
// ensures that the list will be correctly sorted.
// The idea is that by starting out comparing elements far apart can help them move to their correctly
// location with less exchanges. Will this hold true in experimentation?
// Choosing gap sequences is a problem I won't look at. Try a couple popular ones and look
// for asthetically pleasing sequences when animating the sort.
export function sort (compare, list) {
    // Use the experimentally derived Ciura sequence, from the Shell Sort Wikipedia entry.
    const gapSeq = [701, 301, 132, 57, 23, 10, 4, 1];
    // There's no need to sort gaps larger than the list so find the gap to use.
    let gapIndex = gapSeq.findIndex(n => n < list.length);
    while (gapIndex < gapSeq.length) {
        const gap = gapSeq[gapIndex];
        for (let i = gap; i < list.length; i++) {
            for (let j = i; j >= gap && compare(list[j], list[j - gap]) < 0; j -= gap) {
                exchange(list, j, j - gap);
            }
        }
        gapIndex++;
    }
    return list;
}
