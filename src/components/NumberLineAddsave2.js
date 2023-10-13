import React from 'react';

const NumberLineAddition = ({ num1, num2 }) => {
    const sum = num1 + num2;
    const maxNum = Math.max(0, num1, sum);
    const minNum = Math.min(0, num1, sum);
    const lineLength = maxNum - minNum;

    const viewportWidth = 400;  // You can adjust this to fit your requirements
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


The problem is that you're drawing the lifted curved arrow (the second arrow) from num1 to sum. This logic will always make the arrow go in the positive direction as it's relative to the sum. Instead, you need the arrow to go from num1 to num1 + num2 in order to correctly visualize the addition (or subtraction if num2 is negative).

Here's the modification needed:

Compute the ending point of the arrow. Instead of sum, use num1 + num2.

Adjust the path definition for the lifted curved arrow to make sure the arrow's direction matches the sign of num2.

Here's the updated code with comments to guide you:

jsx
Copy code
{/* Draw straight arrow for num1 */}
<path
    d={`M ${UNIT + (-minNum) * UNIT} 50 L ${UNIT + (num1 - minNum) * UNIT - tipLength} 50`}
    fill="none"
    stroke="red"
    strokeWidth="3"
    markerEnd="url(#arrowhead)"
/>

{/* Draw lifted curved arrow for num2 */}
<path
    d={`M ${UNIT + (num1 - minNum) * UNIT} ${50 - LIFT} C ${UNIT + (num1 - minNum) * UNIT} ${20 - LIFT} ${UNIT + (num1 + num2 - minNum) * UNIT} ${20 - LIFT} ${UNIT + (num1 + num2 - minNum) * UNIT} ${50 - LIFT}`}
    fill="none"
    stroke="blue"  // Changed color to distinguish from num1's arrow
    strokeWidth="3"
    markerEnd="url(#arrowhead)"
/>
            {/* Label for the curve (num2) */}
            {/*}
            <text 
                x={(UNIT + (num1 - minNum) * UNIT + UNIT + (sum - minNum) * UNIT) / 2} 
                y={20 - LIFT - 5} 
                fill="black" 
                textAnchor="middle"
            >
            {num2}
            </text>
            */}

            {/* Arrowhead definition */}
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 L 2 5 z" fill="red" />
                </marker>
            </defs>
        </svg>
    );
}

export default NumberLineAddition;

// Usage: <NumberLineAddition num1={-3} num2={8} />