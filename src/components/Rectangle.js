import React from "react";

function Rectangle(props) {
  const { a, b } = props;
  const squareSize = 30; // Size of each square in pixels
  
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${a}, ${squareSize}px)`, // Change container columns to 'a'
    gridTemplateRows: `repeat(${b}, ${squareSize}px)`, // Change container rows to 'b'
    backgroundImage: "linear-gradient(lightgray 1px, transparent 1px), linear-gradient(to right, lightgray 1px, transparent 1px)",
    backgroundSize: `${squareSize}px ${squareSize}px`,
  };
  
  /*
  const squareStyle = {
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    backgroundColor: "red",
    border: "1px solid gray",
    boxSizing: "border-box",
  };
  */
  const squareStyle = {
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    backgroundImage: "linear-gradient(-45deg, #f87171, #ef4444)", // Diagonal gradient using specified colors
    border: "1px solid gray",
    boxSizing: "border-box",
  };



  const squares = [];
  for (let row = 0; row < b; row++) {
    for (let col = 0; col < a; col++) {
      squares.push(<div key={`${row}-${col}`} style={squareStyle}></div>);
    }
  }

  return <div style={containerStyle}>{squares}</div>;
}

export default Rectangle;