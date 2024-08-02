import { AnimationArrayType } from "../lib/types";

function runInsertionSort(arr: number[], animations: AnimationArrayType) {
  for (let i = 1; i < arr.length; i++) {
    animations.push([[i], false]);
    const currentValue = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > currentValue) {
      animations.push([[j, j + 1, i], false]);
      arr[j + 1] = arr[j];
      animations.push([[j + 1, arr[j]], true]);
      j -= 1;
    }
    arr[j + 1] = currentValue;
    animations.push([[j + 1, currentValue], true]);
  }
}

export function InsertionSort(
  isSorting: boolean,
  arr: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (arr.length <= 1) return [];
  const animations: AnimationArrayType = [];

  const auxArr = arr.slice();
  runInsertionSort(auxArr, animations);
  runAnimation(animations);
}
