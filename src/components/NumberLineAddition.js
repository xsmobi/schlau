import React from 'react';

const NumberLineAddition = ({ num1, num2 }) => {
    const sum = num1 + num2;
    const maxNum = Math.max(0, num1, sum);
    const minNum = Math.min(0, num1, sum);
    const lineLength = maxNum - minNum;

    const viewportWidth = Math.min(window.innerWidth, 300);  // You can adjust this to fit your requirements
    // const viewportWidth = 300;
    const UNIT = viewportWidth / (lineLength + 2);  // Formula for UNIT based on lineLength

    const LIFT = 15;  // Amount by which the second arrow is lifted
    const tipLength = 3; // Assuming the tip length in SVG units is 3
    const shownNumbers = [0, num1, sum];

    return (
        <svg width={lineLength * UNIT + 2 * UNIT} height="100">
            {/* Draw number line */}
            <line x1={UNIT} y1="50" x2={lineLength * UNIT + UNIT} y2="50" stroke="black" />
            {[...Array(lineLength + 1)].map((_, idx) => (
                <g key={idx}>
                    {/* Draw ticks */}
                    <line x1={UNIT + idx * UNIT} y1="45" x2={UNIT + idx * UNIT} y2="55" stroke="black" />
                    {/* Draw numbers conditionally */}
                    {shownNumbers.includes(idx + minNum) && (
                        <text x={UNIT + idx * UNIT} y="70" fill="black" textAnchor="middle">
                            {idx + minNum}
                        </text>
                    )}
                </g>
            ))}


{/* Arrowhead definitions */}
<defs>
    {/* Arrowhead for red arrow */}
    <marker id="arrowhead-red" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 L 2 5 z" fill="red" />
    </marker>
    
    {/* Arrowhead for blue arrow */}
    <marker id="arrowhead-blue" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 L 2 5 z" fill="blue" />
    </marker>
</defs>

{/* Draw straight arrow for num1 */}
<path
    d={`M ${UNIT + (-minNum) * UNIT} 50 L ${UNIT + (num1 - minNum) * UNIT - tipLength} 50`}
    fill="none"
    stroke="red"
    strokeWidth="3"
    markerEnd="url(#arrowhead-red)"
/>

{/* Draw lifted curved arrow for num2 */}
<path
    d={`M ${UNIT + (num1 - minNum) * UNIT} ${50 - LIFT} C ${UNIT + (num1 - minNum) * UNIT} ${20 - LIFT} ${UNIT + (num1 + num2 - minNum) * UNIT} ${20 - LIFT} ${UNIT + (num1 + num2 - minNum) * UNIT} ${50 - LIFT}`}
    fill="none"
    stroke="blue" 
    strokeWidth="3"
    markerEnd="url(#arrowhead-blue)"
/>





        </svg>
    );
}

//console.log(window.innerWidth);

export default NumberLineAddition;

// Usage: <NumberLineAddition num1={-3} num2={8} />