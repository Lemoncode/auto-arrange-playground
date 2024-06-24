import { Box } from "../model";

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isOverlapping = (box1: Box, box2: Box): boolean => {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
};

interface Size {
  width: number;
  height: number;
}

const generateRandomBox = (
  existingBoxes: Box[],
  maxItemSize: Size,
  canvasSize: Size
): Box => {
  let newBox: Box;
  let attempts = 0;
  do {
    const width = getRandomInt(30, maxItemSize.width);
    const height = getRandomInt(30, maxItemSize.height);
    const x = getRandomInt(0, canvasSize.width - width);
    const y = getRandomInt(0, canvasSize.height - height);
    newBox = { x, y, width, height };
    attempts++;
  } while (
    existingBoxes.some((existingBox) => isOverlapping(newBox, existingBox)) &&
    attempts < 100
  );

  if (attempts >= 100) {
    throw new Error(
      "No se pudo encontrar un espacio libre para la nueva caja."
    );
  }

  return newBox;
};

export const generateRandomBoxes = (
  count: number,
  maxItemSize: Size,
  canvasSize: Size
): Box[] => {
  const boxes: Box[] = [];
  for (let i = 0; i < count; i++) {
    const newBox = generateRandomBox(boxes, maxItemSize, canvasSize);
    boxes.push(newBox);
  }
  return boxes;
};
