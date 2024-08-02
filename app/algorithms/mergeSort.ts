import { AnimationArrayType } from "../lib/types";

function merge(
  arr: number[],
  begin: number,
  middle: number,
  finish: number,
  animations: AnimationArrayType
) {
  const left = arr.slice(begin, middle);
  const right = arr.slice(middle, finish);

  let i = 0;
  let j = 0;
  let k = begin;
  while (i < left.length && j < right.length) {
    animations.push([[begin + i, middle + j], false]);
    if (left[i] <= right[j]) {
      animations.push([[k, left[i]], true]);
      arr[k] = left[i];
      i += 1;
    } else {
      animations.push([[k, right[j]], true]);
      arr[k] = right[j];
      j += 1;
    }
    k++;
  }
  while (i < left.length) {
    animations.push([[begin + i], false]);
    animations.push([[k, left[i]], true]);
    arr[k] = left[i];
    i += 1;
    k += 1;
  }
  while (j < right.length) {
    animations.push([[middle + j], false]);
    animations.push([[k, right[j]], true]);
    arr[k] = right[j];
    j += 1;
    k += 1;
  }
}

function runMergeSort(arr: number[]) {
  const animations: AnimationArrayType = [];
  for (let k = 1; k < arr.length; k = 2 * k) {
    for (let i = 0; i < arr.length; i += 2 * k) {
      const begin = i;
      const middle = i + k;
      const finish = Math.min(i + 2 * k, arr.length);
      merge(arr, begin, middle, finish, animations);
    }
  }
  return animations;
}

export function MergeSort(
  isSorting: boolean,
  arr: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (arr.length <= 1) return [];

  const auxArr = arr.slice();
  const animations = runMergeSort(auxArr);
  runAnimation(animations);
}
