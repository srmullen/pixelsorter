export function number (a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        throw new Error(`Cannot compare ${a} to ${b}`);
    }
}
