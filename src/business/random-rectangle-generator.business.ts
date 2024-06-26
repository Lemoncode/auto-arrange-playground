import { Box, Size } from "../model";
import { getRandomInt, isOverlapping } from "./canvas.utils";

export const generateRandomSize = (maxItemSize: Size): Size => ({
  width: getRandomInt(30, maxItemSize.width),
  height: getRandomInt(30, maxItemSize.height),
});

const generateRandomBox = (
  existingBoxes: Box[],
  maxItemSize: Size,
  canvasSize: Size
): Box => {
  let newBox: Box;
  let attempts = 0;
  do {
    const { width, height } = generateRandomSize(maxItemSize);
    const x = getRandomInt(0, canvasSize.width - width);
    const y = getRandomInt(0, canvasSize.height - height);
    newBox = { x, y, width, height, color: "blue" };
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
