import { curry, identity } from 'ramda';
import { exchange } from './exchange';

// Heap Sort
// Heap sort works similarly to selection sort but uses a data structure called a heap to
// find the next element to add to the list. A heap can find an element in O(log n) rather
// that the O(n) time of an array.

// A heap is a tree structure that satisfies the heap property. This means that the value of
// a parent node will be greater than any of its children. The comparator will be used
// for determining where a node belongs in the heap.
// Binary heap implemented here.

export const sort = curry((exchange, compare, list) => {
  // Subtree is index into the array. The subtree chilren must already be a heaps.
  function heapify(size, subtree) {
    let root = subtree;
    // get the children
    let left = 2 * subtree + 1;
    let right = 2 * subtree + 2;

    if (left < size && compare(list[left], list[root]) > 0) {
      root = left;
    }

    if (right < size && compare(list[right], list[root]) > 0) {
      root = right;
    }

    if (subtree !== root) {
      exchange(list, root, subtree);
      // affected subtree now needs to be heapified.
      heapify(size, root);
    }
  }

  // Create the heap.
  for (let i = Math.floor(list.length / 2 - 1); i >= 0; i--) {
    heapify(list.length, i);
  }

  // Iterate through the list taking the smallest element and placing it at the beginning.
  // Then heapify the affected subtree.
  for (let i = list.length - 1; i >= 0; i--) {
    exchange(list, 0, i);
    heapify(i, 0);
  }
});

function* step_gen(exchange, compare, list) {
  // Subtree is index into the array. The subtree chilren must already be a heaps.
  function* heapify(size, subtree) {
    let root = subtree;
    // get the children
    let left = 2 * subtree + 1;
    let right = 2 * subtree + 2;

    if (left < size && compare(list[left], list[root]) > 0) {
      root = left;
    }

    if (right < size && compare(list[right], list[root]) > 0) {
      root = right;
    }

    if (subtree !== root) {
      exchange(list, root, subtree);
      yield { list };
      // affected subtree now needs to be heapified.
      for (let v of heapify(size, root)) {
        yield v;
      }
    }
  }

  // Create the heap.
  for (let i = Math.floor(list.length / 2 - 1); i >= 0; i--) {
    for (let v of heapify(list.length, i)) {
      yield v;
    }
  }

  // Iterate through the list taking the smallest element and placing it at the beginning.
  // Then heapify the affected subtree.
  for (let i = list.length - 1; i >= 0; i--) {
    exchange(list, 0, i);
    yield { list };
    for (let v of heapify(i, 0)) {
      yield v;
    }
  }
}

function* demo_gen(exchange, compare, list) {
  // Subtree is index into the array. The subtree chilren must already be a heaps.
  function* heapify(size, subtree) {
    let root = subtree;
    // get the children
    let left = 2 * subtree + 1;
    let right = 2 * subtree + 2;

    yield { subtree: { root, left, right }, compare: [] };

    if (
      left < size &&
      (yield { compare: [left, root] }, compare(list[left], list[root])) > 0
    ) {
      root = left;
    }

    if (
      right < size &&
      (yield { compare: [right, root] }, compare(list[right], list[root]) > 0)
    ) {
      root = right;
    }

    if (subtree !== root) {
      exchange(list, root, subtree);
      yield { list: list.map(identity) };
      // affected subtree now needs to be heapified.
      for (let v of heapify(size, root)) {
        yield v;
      }
    }
  }

  // Create the heap.
  for (let i = Math.floor(list.length / 2 - 1); i >= 0; i--) {
    for (let v of heapify(list.length, i)) {
      yield v;
    }
  }

  // Iterate through the list taking the smallest element and placing it at the beginning.
  // Then heapify the affected subtree.
  for (let i = list.length - 1; i >= 0; i--) {
    exchange(list, 0, i);
    yield { list: list.map(identity), sortedRight: i };
    for (let v of heapify(i, 0)) {
      yield v;
    }
  }

  yield { sorted: true };
}

export const step = curry(step_gen);
export const demo = curry(demo_gen);
