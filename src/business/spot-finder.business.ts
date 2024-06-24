import { Box, Size } from "../model";
import { isOverlapping } from "./canvas.utils";

function* spiralPositions(
  centerX: number,
  centerY: number,
  canvasSize: Size
): Generator<[number, number]> {
  let x = 0,
    y = 0,
    dx = 0,
    dy = -1;
  for (let i = 0; i < Math.max(canvasSize.width, canvasSize.height) ** 2; i++) {
    if (
      -canvasSize.width / 2 < x &&
      x < canvasSize.width / 2 &&
      -canvasSize.height / 2 < y &&
      y < canvasSize.height / 2
    ) {
      yield [centerX + x, centerY + y];
    }
    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
      [dx, dy] = [-dy, dx];
    }
    x += dx;
    y += dy;
  }
}

export function findFreePosition(
  boxes: Box[],
  newBoxSize: Size,
  canvasSize: Size
): Box | null {
  const centerX = Math.floor(canvasSize.width / 2);
  const centerY = Math.floor(canvasSize.height / 2);

  for (const [x, y] of spiralPositions(centerX, centerY, canvasSize)) {
    const newBox = {
      x,
      y,
      width: newBoxSize.width,
      height: newBoxSize.height,
      // TODO: we will remove this once we get rid of the poc
      // and integrate this into the main app
      color: "orange",
    };
    if (
      x >= 0 &&
      y >= 0 &&
      x + newBoxSize.width <= canvasSize.width &&
      y + newBoxSize.height <= canvasSize.height &&
      !boxes.some((existingBox) => isOverlapping(newBox, existingBox))
    ) {
      return newBox;
    }
  }
  // TODO: if no free position is found, return a random one
  return null;
}
