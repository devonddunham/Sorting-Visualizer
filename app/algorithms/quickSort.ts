import { AnimationArrayType } from "../lib/types";

function partition(
  arr: number[],
  begin: number,
  finish: number,
  animations: AnimationArrayType
) {
  let i = begin;
  let j = finish + 1;
  const condition = true;
  const pivot = arr[begin];
  while (condition) {
    while (arr[++i] <= pivot) {
      if (i === finish) break;
      animations.push([[i], false]);
    }
    while (arr[--j] >= pivot) {
      if (j === begin) break;
      animations.push([[j], false]);
    }
    if (j <= i) break;
    animations.push([[i, arr[j]], true]);
    animations.push([[j, arr[i]], true]);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  animations.push([[begin, arr[j]], true]);
  animations.push([[j, arr[begin]], true]);
  [arr[begin], arr[j]] = [arr[j], arr[begin]];
  return j;
}

function runQuickort(
  arr: number[],
  begin: number,
  finish: number,
  animations: AnimationArrayType
) {
  if (begin < finish) {
    const part = partition(arr, begin, finish, animations);
    runQuickort(arr, begin, part - 1, animations);
    runQuickort(arr, part + 1, finish, animations);
  }
}

export function QuickSort(
  isSorting: boolean,
  arr: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (arr.length <= 1) return arr;

  const animations: AnimationArrayType = [];
  const auxArr = arr.slice();
  runQuickort(auxArr, 0, arr.length - 1, animations);
  runAnimation(animations);
}
