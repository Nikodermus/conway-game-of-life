export const copyArray = (array) => {
  let array_copy = []; // An new empty array
  for (let index in array) {
    if (!Array.isArray(array[index])) {
      array_copy[index] = array[index];
    } else {
      array_copy[index] = copyArray(array[index]);
    }
  }
  return array_copy;
}