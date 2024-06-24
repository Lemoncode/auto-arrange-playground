import { useEffect, useState } from "react";
import "./App.css";
import { canvasWidth, canvasHeight } from "./core";
import { Box } from "./model";
import { generateRandomBoxes } from "./business/random-rectangle-generator.business";
import { findFreePosition } from "./business/spot-finder.business";

function App() {
  const [boxes, setBoxes] = useState<Box[]>([]);

  const generateNewScenario = () => {
    setBoxes(
      generateRandomBoxes(
        20,
        { width: 200, height: 300 },
        { width: canvasWidth, height: canvasHeight }
      )
    );
  };

  const addNewBox = () => {
    const newBox = findFreePosition(
      boxes,
      { width: 50, height: 50 },
      { width: canvasWidth, height: canvasHeight }
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
            fill="blue"
          />
        ))}
      </svg>
    </>
  );
}

export default App;
