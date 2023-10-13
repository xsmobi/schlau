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

            {/* Draw straight arrow for num1 */}
            <path
                d={`M ${UNIT + (-minNum) * UNIT} 50 L ${UNIT + (num1 - minNum) * UNIT - tipLength} 50`}
                fill="none"
                stroke="red"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
            />

            {/* Draw lifted curved arrow for sum */}
            <path
                d={`M ${UNIT + (num1 - minNum) * UNIT} ${50 - LIFT} C ${UNIT + (num1 - minNum) * UNIT} ${20 - LIFT} ${UNIT + (sum - minNum) * UNIT} ${20 - LIFT} ${UNIT + (sum - minNum) * UNIT} ${50 - LIFT}`}
                fill="none"
                stroke="red"
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