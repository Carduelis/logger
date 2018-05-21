const charCode = smth => {
  if (typeof smth === 'undefined') {
    // when object's key doesn't exist enter a big number for sorting
    return 10000;
  }
  return smth.toString().toLowerCase().charCodeAt();
};

export default function (object, comparator) {
  if (arguments.length !== 2) {
    throw new Error(`Passed ${arguments.length} arguments instead of 2`);
  }
  let comparatorFunction;
    if (typeof comparator === 'function') {
      comparatorFunction = comparator;
    } else if (typeof comparator === 'string') {
      comparatorFunction = (a, b) =>
        charCode(object[a][comparator]) - charCode(object[b][comparator]);
    } else {
      const errorText = `Expected a string or a function, but ${typeof comparator} passed`;
      throw new Error(errorText);
    }
    return Object.keys(object)
      .sort(comparatorFunction);
}
