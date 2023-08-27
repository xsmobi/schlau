import React from "react";

function Rectangle(props) {
  const { a, b } = props;
  const squareSize = 30; // Size of each square in pixels
  
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${a}, ${squareSize}px)`,
    gridTemplateRows: `repeat(${b}, ${squareSize}px)`,
    backgroundImage: "linear-gradient(lightgray 1px, transparent 1px), linear-gradient(to right, lightgray 1px, transparent 1px)",
    backgroundSize: `${squareSize}px ${squareSize}px`,
  };
  
  const squareStyle = {
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    backgroundImage: "linear-gradient(-45deg, #f87171, #ef4444)",
    border: "1px solid gray",
    boxSizing: "border-box",
  };

  const emphasizedSquareStyle = {
    width: `${squareSize * 10}px`,
    height: `${squareSize * 10}px`,
    border: "2px solid darkgray",
    boxSizing: "border-box",
  };

  const squares = [];
  // Add the emphasized square
  squares.push(
    <div key="emphasized-square" style={emphasizedSquareStyle}></div>
  );
  
  // Add the other squares based on dimensions
  for (let row = 0; row < b; row++) {
    for (let col = 0; col < a; col++) {
      // Skip the first mini square to account for emphasized square
      if (row === 0 && col === 0) continue; 
      
      squares.push(
        <div
          key={`${row}-${col}`}
          style={squareStyle}
        ></div>
      );
    }
  }

  return <div style={containerStyle}>{squares}</div>;
}

export default Rectangle;
