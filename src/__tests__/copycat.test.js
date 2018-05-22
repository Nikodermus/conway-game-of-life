import { copyArray, compareArray } from '../helpers/copycat'

test('Array deep cloning', () => {
  let test_array = [[2], [[1], [2]]];
  let copy_array = copyArray(test_array);
  test_array[1][0][0] = 'this should not change';
  expect(copy_array).toEqual([[2], [[1], [2]]]);
});

test('Compare deep arrays', () => {
  let test_array = [[2], [[1], [2]]];
  expect(compareArray(test_array, test_array)).toBeTruthy();
  expect(compareArray(test_array, [[2], [[1], [2]]])).toBeTruthy();
  expect(compareArray(test_array, [[2], [[2], [2]]])).toBeFalsy();
})