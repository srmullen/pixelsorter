import {exchange} from "./exchange";

// Heap Sort
// Heap sort works similarly to selection sort but uses a data structure called a heap to
// find the next element to add to the list. A heap can find an element in O(log n) rather
// that the O(n) time of an array.

// A heap is a tree structure that satisfies the heap property. This means that the value of
// a parent node will be greater than any of its childred. The comparator will be used
// for determining where a node belongs in the heap.
// Binary heap implemented here.
function createNode (val, children = []) {
    return {val: [val], children};
}

function createHeap (compare, list) {
    // The value of each node is an array indices to the list. It is an array to handle
    // equal values.
    let root = createNode(list[0]);
    for (let i = 1; i < list.length; i++) {
        const comparison = compare(list[root.val[0]], list[i]);
        // Make list[i] a new root if it is larger
        if (comparison < 0) {
            // Create the node;
            const node = createNode(list[i]);
            // Add the current root to children.
            node.children.push(root);
            // Make the new node the root;
            root = node;
        } else if (comparison > 0) {
            // Create the node;
            const node = createNode(list[i]);
            // The new node is added to the children;
            root.children.push(node);
        } else { // values are equal
            root.val.push(list[i]);
        }
    }
    return root;
}

// Removes the top node of the heap and returns it along with the new heap structure.
// Comparator is needed to reorganize heap to maintain heap property.
function pop (comparator, heap) {
    // FIXME: This needs the list to compare if only list indices are stored in the heap. hmm...
    const val = heap.val;
    // const newHeap =
    // return {val, newHeap};
}

export function sort (comparator, list) {
    let heap = createHeap(comparator, list);
    // return list
    return heap;
}
