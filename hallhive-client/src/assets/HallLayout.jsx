import React from "react";

export default function HallLayout() {
  // Points for the triangle: top, bottom-right, bottom-left
  const width = 400;
  const height = 400;
  const trianglePoints = [
    `${width / 2},40`,       // top
    `${width - 40},${height - 40}`, // bottom right
    `40,${height - 40}`      // bottom left
  ].join(" ");

  // Floor lines (from bottom to top)
  const floorLines = [
    { y: 340, x1: 75, x2: 325, label: "1st Floor" },
    { y: 270, x1: 105, x2: 295, label: "2nd Floor" },
    { y: 200, x1: 135, x2: 265, label: "3rd Floor" },
    { y: 130, x1: 165, x2: 235, label: "4th Floor" }
  ];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 400 400"
        width="400"
        height="400"
        style={{ background: "#032041", borderRadius: 16 }}
      >
        {/* Outer triangle */}
        <polygon
          points={trianglePoints}
          fill="#FFD700"
          stroke="#032041"
          strokeWidth="8"
        />

        {/* Central field (circle) */}
        <circle
          cx={width / 2}
          cy={240}
          r={55}
          fill="#4ADE80"
          stroke="#032041"
          strokeWidth="6"
        />

        {/* Floor lines and labels */}
        {floorLines.map((floor, idx) => (
          <g key={idx}>
            <line x1={floor.x1} y1={floor.y} x2={floor.x2} y2={floor.y} stroke="#032041" strokeWidth="2" />
            <text
              x={(floor.x1 + floor.x2) / 2}
              y={floor.y - 8}
              textAnchor="middle"
              fontSize="14"
              fill="#032041"
              fontWeight="bold"
            >
              {floor.label}
            </text>
          </g>
        ))}

        {/* Labels */}
        <text
          x={width / 2}
          y={90}
          textAnchor="middle"
          fontSize="22"
          fill="#032041"
          fontWeight="bold"
        >
          Hall
        </text>
        <text
          x={width / 2}
          y={240}
          textAnchor="middle"
          fontSize="16"
          fill="#032041"
          fontWeight="bold"
          dy={6}
        >
          Field
        </text>
      </svg>
      <div className="mt-4 text-center text-gray-800">
        <p>Triangle Hall Layout with Central Field</p>
        <p>Each line represents a floor (1st to 4th from bottom to top).</p>
      </div>
    </div>
  );
}