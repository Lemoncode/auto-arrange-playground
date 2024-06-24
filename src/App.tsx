import { useEffect, useState } from "react";
import "./App.css";
import { canvasWidth, canvasHeight } from "./core";
import { Box } from "./model";
import { generateRandomBoxes } from "./business/random-rectangle-generator.business";

function App() {
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    setBoxes(
      generateRandomBoxes(
        20,
        { width: 200, height: 300 },
        { width: canvasWidth, height: canvasHeight }
      )
    );
  }, []);

  return (
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
  );
}

export default App;
