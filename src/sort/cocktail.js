import { curry, identity } from 'ramda';

// Cocktail Sort
// Similar to bubble sort but bounces back and forth through the list (like a cocktail shaker I guess)
// rather than only moving in one direction. This helps the turtling problem. A turtle is and out-of-place
// number moving against the flow of comparisons. By reversing the flow on each pass the turtles can
// turn into hares.

export const sort = curry((exchange, compare, list) => {
  let sorted = false;
  // 1 to pass through the list left-to-right. -1 for right-to-left pass.
  let dir = 1;
  let sortedLeft = -1;
  let sortedRight = list.length;
  while (!sorted) {
    let exchanges = 0;
    // Since i is moving both directions also need to make sure i doesn't pass the beginning of the list as well.
    for (
      let i = dir > 0 ? sortedLeft + 1 : sortedRight - 1;
      i < sortedRight - dir && i > sortedLeft - dir;
      i += dir
    ) {
      // Multiply * dir to normalize comparison.
      // 1 * compare(a, b) === -1 * compare(b, a)
      if (dir * compare(list[i], list[i + dir]) > 0) {
        exchange(list, i, i + dir);
        exchanges++;
      }
    }
    // update the known sorted items
    if (dir > 0) {
      sortedRight -= 1;
    } else {
      sortedLeft += 1;
    }
    // Switch direction.
    dir = -dir;
    // Check if the list is sorted.
    if (exchanges === 0) sorted = true;
  }
});

function* demo_gen(exchange, compare, list) {
  let sorted = false;
  // 1 to pass through the list left-to-right. -1 for right-to-left pass.
  let dir = 1;
  let sortedLeft = -1;
  let sortedRight = list.length;
  while (!sorted) {
    let exchanges = 0;
    // Since i is moving both directions also need to make sure i doesn't pass the beginning of the list as well.
    for (
      let i = dir > 0 ? sortedLeft + 1 : sortedRight - 1;
      i < sortedRight - dir && i > sortedLeft - dir;
      i += dir
    ) {
      // Multiply * dir to normalize comparison.
      // 1 * compare(a, b) === -1 * compare(b, a)
      yield { compare: [i, i + dir] };
      if (dir * compare(list[i], list[i + dir]) > 0) {
        exchange(list, i, i + dir);
        exchanges++;
        yield { list: list.map(identity), exchanges };
      }
    }
    // update the known sorted items
    if (dir > 0) {
      sortedRight -= 1;
    } else {
      sortedLeft += 1;
    }
    // update sorted indices for highlighting and reset swap counter and comparisons.
    yield { sortedRight, sortedLeft, exchanges: 0, compare: [] };
    // Switch direction.
    dir = -dir;
    // Check if the list is sorted.
    if (exchanges === 0) sorted = true;
  }
  yield { list: list.map(identity) };
}

function* step_gen(exchange, compare, list) {
  let sorted = false;
  // 1 to pass through the list left-to-right. -1 for right-to-left pass.
  let dir = 1;
  let sortedLeft = -1;
  let sortedRight = list.length;
  while (!sorted) {
    let exchanges = 0;
    // Since i is moving both directions also need to make sure i doesn't pass the beginning of the list as well.
    for (
      let i = dir > 0 ? sortedLeft + 1 : sortedRight - 1;
      i < sortedRight - dir && i > sortedLeft - dir;
      i += dir
    ) {
      // Multiply * dir to normalize comparison.
      // 1 * compare(a, b) === -1 * compare(b, a)
      if (dir * compare(list[i], list[i + dir]) > 0) {
        exchange(list, i, i + dir);
        exchanges++;
        yield { list };
      }
    }
    // update the known sorted items
    if (dir > 0) {
      sortedRight -= 1;
    } else {
      sortedLeft += 1;
    }
    // Switch direction.
    dir = -dir;
    // Check if the list is sorted.
    if (exchanges === 0) sorted = true;
  }
  return list;
}

export const demo = curry(demo_gen);
export const step = curry(step_gen);
