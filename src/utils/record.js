import uuid from 'uuid/v1';

export function time(fn) {
  const startTime = new Date().getTime();
  const val = fn();
  const endTime = new Date().getTime();
  console.log(endTime - startTime);
  return val;
}

const callRecord = {};

export function calls(fn) {
  const id = uuid();
  callRecord[id] = 0;
  const monitored = (...args) => {
    callRecord[id]++;
    return fn(...args);
  };
  monitored._id = id;
  return monitored;
}

export function log(fn) {
  console.log(callRecord[fn._id]);
}
