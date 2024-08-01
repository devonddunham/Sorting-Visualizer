"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SortingAlgorithmType, AnimationArrayType } from "../lib/types";
import {
  GenerateRandomNumberFromInterval,
  MAX_ANIMATION_SPEED,
} from "../lib/utils";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  selectedAlgorithm: SortingAlgorithmType;
  isSorting: boolean;
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: (animations: AnimationArrayType) => void;
  requireReset: boolean;
}

const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

export const SortingAlgorithmProvidor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  const requireReset = isAnimationComplete || isSorting;

  useEffect(() => {
    resetArrayAndAnimation();

    // changes amount of lines dependent on window resize
    window.addEventListener("resize", resetArrayAndAnimation);
    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    };
  }, []);

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    const width = contentContainer.clientWidth;
    const temp: number[] = [];
    const numLines = width / 8;
    const height = window.innerHeight;
    const maxLineHeight = Math.max(height - 420, 100);

    for (let i = 0; i < numLines; i++) {
      temp.push(GenerateRandomNumberFromInterval(35, maxLineHeight));
    }

    setArrayToSort(temp);
    setIsAnimationComplete(false);
    setIsSorting(false);
  };

  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / animationSpeed) * 200;

    const lines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    // updating colors of line when swapped
    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        lines[index].classList.add(addClassName);
        lines[index].classList.add(addClassName);
      });
    };

    const updateHeightValue = (lineIndex: number, newHeight: number) => {
      if (newHeight === undefined) return;
      lines[lineIndex].style.height = `${newHeight}px`;
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap] = animation;

        if (!isSwap) {
          updateClassList(values, "change-line-color", "default-line-color");
          setTimeout(() => {
            updateClassList(values, "default-line-color", "change-line-color");
          }, inverseSpeed);
        } else {
          const [lineIndex, newHeight] = values;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    });
  };

  const value = {
    arrayToSort,
    setArrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    requireReset,
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext);

  if (!context) {
    throw new Error(
      "func must be used within a SortingAlgorithmContextProvidor"
    );
  }

  return context;
};
