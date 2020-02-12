import { curry, identity } from "ramda";

// Comb sort works similar to bubble sort, but instead of
// only comparing adjacent elements it also compares elements
// at a certain gap distance. The gap decreases until adjacent elements
// are being compared. The gap helps move elements closer to their correct
// position with fewer swaps.
export const sort = curry((exchange, compare, list) => {
  let sorted = false;
  let gap = Math.floor(list.length - 1);

  function nextGap(gap) {
    return gap - 1;
  }

  while (!sorted) {
    let swaps = 0;
    for (let i = 0; i < list.length - gap; i++) {
      if (compare(list[i], list[i + gap]) > 0) {
        exchange(list, i, i + gap);
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

function* step_gen(exchange, compare, list) {
  let sorted = false;
  let gap = Math.floor(list.length - 1);

  function nextGap(gap) {
    return gap - 1;
  }

  while (!sorted) {
    let swaps = 0;
    for (let i = 0; i < list.length - gap; i++) {
      if (compare(list[i], list[i + gap]) > 0) {
        exchange(list, i, i + gap);
        yield { list };
        swaps++;
      }
    }

    if (gap === 1) {
      if (swaps === 0) sorted = true;
    } else {
      gap = nextGap(gap);
    }
  }
}

export const step = curry(step_gen);
