import { copyArray } from '../helpers/copycat'

test('Array deep cloning', () => {
  let test_array = [[2], [[1], [2]]];
  let copy_array = copyArray(test_array);
  test_array[1][0][0] = 'this should not change';
  expect(copy_array).toEqual([[2], [[1], [2]]]);
});