export function timeFunc(fn) {
  const startTime = new Date().getTime();
  const val = fn();
  const endTime = new Date().getTime();
  return {
    val,
    time: endTime - startTime
  };
}
