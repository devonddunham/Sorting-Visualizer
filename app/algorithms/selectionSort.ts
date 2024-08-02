import { AnimationArrayType } from "../lib/types";

function runSelectionSort(arr: number[], animations: AnimationArrayType) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push([[j, i], false]);
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    animations.push([[i, arr[minIndex]], true]);
    animations.push([[minIndex, arr[i]], true]);
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
}

export function SelectionSort(
  isSorting: boolean,
  arr: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (arr.length <= 1) return;

  const animations: AnimationArrayType = [];
  const auxArr = arr.slice();
  runSelectionSort(auxArr, animations);
  runAnimation(animations);
}
