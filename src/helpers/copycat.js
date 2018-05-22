export const copyArray = (array) => {
  let array_copy = [];
  for (let index in array) {
    // If it's not an array, just copy the value
    if (!Array.isArray(array[index])) {
      array_copy[index] = array[index];
    } else {
      // Recursive copy inner arrays
      array_copy[index] = copyArray(array[index]);
    }
  }
  return array_copy;
}

export const compareArray = (array_1, array_2) => {
  // All elements including inner should be the same
  return array_1.every((elem, index) => {
    if (Array.isArray(array_1[index])) {
      // We have an array, so check inner elems
      return compareArray(array_1[index], array_2[index]);
    } else {
      // If not an array, just compare
      return array_1[index] === array_2[index];
    }
  });
}