import uuid from "uuid/v1";

export function create (val) {
    return {id: uuid(), val};
}

export function copy (block) {
    return {id: uuid(), val: block.val};
}
