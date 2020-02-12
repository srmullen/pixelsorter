import { curry, identity } from 'ramda';

// Quick Sort
// Divide-and-Conquer algorithm. Choose an element from the list, called a pivot, and
// then partition the rest of the list into greater-than or less-than the pivot. Continue
// sorting the partitions recursivly.
//
// Takes on average O(n log n) comparisons but in the worst case can take O(n^2).
// Choice of the pivot can make a big difference in the running time. For example
// if all the elements end up in only one partition then not much work has been accomplished.
// If this happend for every partition then the running time will be O(n^2). Proof?

export const sort = curry((exchange, compare, list) => {
  function partition(list, low, high) {
    // Base case: List is too small to partition.
    if (high <= low) return;

    // I'll just use the last item of the list as the pivot.
    // May explore other ways of choosing the pivot.
    let pivot = high;
    let i = low;
    let j = high - 1;
    while (true) {
      // Need to work backwards and forwards though the list exchanging elements where needed.
      // Find a low element that needs to be swapped.
      while (compare(list[i], list[pivot]) <= 0) {
        if (i === high) break;
        i += 1;
      }

      // Find a high element to swap.
      while (compare(list[j], list[pivot]) >= 0) {
        if (j === low) break;
        j -= 1;
      }

      // Break out of the loop.
      if (i >= j) {
        break;
      }

      // Swap the low and high elements.
      exchange(list, i, j);
    }

    // Put the pivot between the partitions
    exchange(list, i, pivot);

    // Partition the list smaller than the pivot.
    partition(list, low, i - 1);
    // Partition the list larger than the pivot.
    partition(list, i + 1, high);
  }

  partition(list, 0, list.length - 1);
});

function* demo_gen(exchange, compare, list) {
  function* partition(list, low, high) {
    // Base case: List is too small to partition.
    if (high <= low) return;

    // I'll just use the last item of the list as the pivot.
    // May explore other ways of choosing the pivot.
    let pivot = high;
    yield { pivot };
    let i = low;
    let j = high - 1;
    while (true) {
      // Need to work backwards and forwards though the list exchanging elements where needed.
      // Find a low element that needs to be swapped.
      while (
        (yield { compare: [i, pivot] }, compare(list[i], list[pivot]) <= 0)
      ) {
        if (i === high) break;
        i += 1;
      }

      // Find a high element to swap.
      while (
        (yield { compare: [j, pivot] }, compare(list[j], list[pivot]) >= 0)
      ) {
        if (j === low) break;
        j -= 1;
      }

      // Break out of the loop.
      if (i >= j) {
        break;
      }

      // Swap the low and high elements.
      exchange(list, i, j);
      yield { list: list.map(identity) };
    }

    // Put the pivot between the partitions
    exchange(list, i, pivot);
    yield { list: list.map(identity) };

    // Partition the list smaller than the pivot.
    for (let v of partition(list, low, i - 1)) {
      yield v;
    }
    // Partition the list larger than the pivot.
    for (let v of partition(list, i + 1, high)) {
      yield v;
    }
  }

  // partition(list, 0, list.length - 1);
  for (let v of partition(list, 0, list.length - 1)) {
    yield v;
  }

  yield { sorted: true };
}

function* step_gen(exchange, compare, list) {
  function* partition(list, low, high) {
    // Base case: List is too small to partition.
    if (high <= low) return;

    // I'll just use the last item of the list as the pivot.
    // May explore other ways of choosing the pivot.
    let pivot = high;
    yield { pivot };
    let i = low;
    let j = high - 1;
    while (true) {
      // Need to work backwards and forwards though the list exchanging elements where needed.
      // Find a low element that needs to be swapped.
      while (compare(list[i], list[pivot]) <= 0) {
        if (i === high) break;
        i += 1;
      }

      // Find a high element to swap.
      while (compare(list[j], list[pivot]) >= 0) {
        if (j === low) break;
        j -= 1;
      }

      // Break out of the loop.
      if (i >= j) {
        break;
      }

      // Swap the low and high elements.
      exchange(list, i, j);
      yield { list };
    }

    // Put the pivot between the partitions
    exchange(list, i, pivot);
    yield { list };

    // Partition the list smaller than the pivot.
    for (let v of partition(list, low, i - 1)) {
      yield v;
    }
    // Partition the list larger than the pivot.
    for (let v of partition(list, i + 1, high)) {
      yield v;
    }
  }

  // partition(list, 0, list.length - 1);
  for (let v of partition(list, 0, list.length - 1)) {
    yield v;
  }
  return list;
}

export const demo = curry(demo_gen);
export const step = curry(step_gen);
