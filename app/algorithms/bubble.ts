import { AnimationArrayType } from "../lib/types";

function runBubbleSort(arr: number[], animations: AnimationArrayType) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      animations.push([[j, j + 1], false]);
      if (arr[j] > arr[j + 1]) {
        animations.push([[j, arr[j + 1]], true]);
        animations.push([[j + 1, arr[j]], true]);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

export function BubbleSort(
  isSorting: boolean,
  arr: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (arr.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxArr = arr.slice();
  runBubbleSort(auxArr, animations);
  runAnimation(animations);
}
