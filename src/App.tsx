import { useEffect, useState } from "react";
import "./App.css";
import { canvasWidth, canvasHeight, maxItemSize } from "./core";
import { Box } from "./model";
import {
  generateRandomBoxes,
  generateRandomSize,
} from "./business/random-rectangle-generator.business";
import { findFreePositionOrMinCollision } from "./business/spot-finder.business";

function App() {
  const [boxes, setBoxes] = useState<Box[]>([]);

  const generateNewScenario = () => {
    setBoxes(
      generateRandomBoxes(20, maxItemSize, {
        width: canvasWidth,
        height: canvasHeight,
      })
    );
  };

  const addNewBox = () => {
    const newBox = findFreePositionOrMinCollision(
      boxes,
      generateRandomSize(maxItemSize),
      {
        width: canvasWidth,
        height: canvasHeight,
      }
    );

    setBoxes((prevBoxes) => (newBox ? [...prevBoxes, newBox] : prevBoxes));

    if (newBox === null) {
      alert("No free position found");
    }
  };

  useEffect(() => {
    generateNewScenario();
  }, []);

  return (
    <>
      <button onClick={() => setBoxes([])}>Clear Boxes</button>
      <button onClick={() => generateNewScenario()}>New Random scenario</button>
      <button onClick={() => addNewBox()}>Add new box</button>
      <svg
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black" }}
      >
        {boxes.map((box, index) => (
          <rect
            key={index}
            x={box.x}
            y={box.y}
            width={box.width}
            height={box.height}
            stroke="black"
            fill={box.color}
          />
        ))}
      </svg>
    </>
  );
}

export default App;
