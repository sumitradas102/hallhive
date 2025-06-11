import { useState } from "react";
import { Link } from "react-router-dom";

const SUST_LOGO = "/sust-logo.png";
const HALL_MAP_IMAGE = "/hallmap.png";

function SchematicSVG({ floor }) {
  function lerp([x1, y1], [x2, y2], t) {
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
  }
  const SCALE = 2;
  const centerX = 240 * SCALE;

  // Outer polygon (flat top corners, sharp bottom tip)
  const A = [10 * SCALE, 70 * SCALE];
  const B = [470 * SCALE, 70 * SCALE];
  const C = [240 * SCALE, 300 * SCALE];
  const flat = 0.11;
  const A1 = lerp(A, B, 0.05);
  const A2 = lerp(A, C, flat);
  const B1 = lerp(B, C, flat);
  const B2 = lerp(B, A, 0.05);
  const outer = [A1, B2, B1, C, A2].map((p) => p.join(",")).join(" ");

  // Symmetrical fields
  const fieldYTop = 105 * SCALE;
  const fieldYBottom = 250 * SCALE;
  const fieldXLeft = 100 * SCALE;
  const fieldXRight = 380 * SCALE;
  const fieldXCenter = centerX;

  const fieldLeft = [
    [fieldXLeft, fieldYTop],
    [fieldXCenter, fieldYBottom],
    [fieldXCenter, fieldYTop],
  ].map((p) => p.join(",")).join(" ");
  const fieldRight = [
    [fieldXRight, fieldYTop],
    [fieldXCenter, fieldYBottom],
    [fieldXCenter, fieldYTop],
  ].map((p) => p.join(",")).join(" ");

  // Walkway, visible
  const walkway = [
    [230 * SCALE, 100 * SCALE],
    [250 * SCALE, 100 * SCALE],
    [250 * SCALE, 250 * SCALE],
    [230 * SCALE, 250 * SCALE],
  ].map((p) => p.join(",")).join(" ");

  const entrance = {
    x: 200 * SCALE,
    y: 40 * SCALE,
    width: 80 * SCALE,
    height: 30 * SCALE,
    rx: 2 * SCALE,
  };

  // Common positions
  const canteenOrPrayerRoom = {
    x: 20 * SCALE,
    y: 65 * SCALE,
    width: 30 * SCALE,
    height: 30 * SCALE,
  };

  // Additional ground floor features
  const provostOffice = {
    x: 120 * SCALE,
    y: 60 * SCALE,
    width: 30 * SCALE,
    height: 30 * SCALE,
  };
  const dining = {
    x: 230 * SCALE,
    y: 260 * SCALE,
    width: 30 * SCALE,
    height: 30 * SCALE,
  };
  const watertank = {
    x: 250 * SCALE,
    y: 150 * SCALE,
    width: 25 * SCALE,
    height: 25 * SCALE,
  };
  // Kitchen 1 and Kitchen 2 for ground floor
  const kitchen1 = {
    x: 200 * SCALE,
    y: 250 * SCALE,
    width: 28 * SCALE,
    height: 28 * SCALE,
  };
  const kitchen2 = {
    x: 420 * SCALE,
    y: 70 * SCALE,
    width: 28 * SCALE,
    height: 28 * SCALE,
  };

  // Washrooms (same positions, shown on all floors)
  const washrooms = [
    {
      x: 60 * SCALE,
      y: 70 * SCALE,
    },
    {
      x: 385 * SCALE,
      y: 70 * SCALE,
    },
    {
      x: 60 * SCALE,
      y: 100 * SCALE,
    },
    {
      x: 400 * SCALE,
      y: 105 * SCALE,
    },
  ];
  const washroomWidth = 20 * SCALE;
  const washroomHeight = 24 * SCALE;

  // Kitchen for 1st-3rd floor
  const upstairKitchen = {
    x: 415 * SCALE,
    y: 70 * SCALE,
    width: 28 * SCALE,
    height: 28 * SCALE,
  };

  // Reading room for 1st floor
  const readingRoom = {
    x: 225 * SCALE,
    y: 250 * SCALE,
    width: 30 * SCALE,
    height: 28 * SCALE,
  };

  const svgWidth = 480 * SCALE;
  const svgHeight = 340 * SCALE;
  const labelStyle = {
    fontFamily: "Segoe UI, Arial, sans-serif",
    letterSpacing: "1px",
    fontWeight: 600,
  };

  const isGround = floor === "Ground Floor";
  const isFirst = floor === "1st Floor";
  const isSecond = floor === "2nd Floor";
  const isUpper = floor === "1st Floor" || floor === "2nd Floor" || floor === "3rd Floor";
  const showFieldLabels = isGround; // Only show "Field" labels on Ground Floor

  return (
    <div className="flex flex-col items-center">
      <div className="font-heading text-lg font-semibold text-[#23395d] mb-3 text-center tracking-wide">
        {floor}
      </div>
      <div className="overflow-auto rounded-3xl bg-white shadow-xl border-2 border-yellow-200 p-4 w-full max-w-[600px]">
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{
            background: "#fff",
            borderRadius: 32,
            boxShadow: "0 8px 40px #23395d15",
            border: "2px solid #49a893",
            width: "100%",
            maxWidth: "550px",
            display: "block",
            margin: "0 auto",
          }}
        >
          {/* Outer polygon */}
          <polygon points={outer} fill="#f6e7c9" stroke="#49a893" strokeWidth={10} />
          {/* Fields */}
          <polygon points={fieldLeft} fill="#bfe5dc" stroke="#49a893" strokeWidth={3} opacity={0.96} />
          <polygon points={fieldRight} fill="#bfe5dc" stroke="#49a893" strokeWidth={3} opacity={0.96} />
          {/* Walkway (drawn AFTER fields, only on ground floor) */}
          {isGround && (
            <polygon
              points={walkway}
              fill="#5ba6f7aa"
              stroke="#1d3557"
              strokeWidth={4}
            />
          )}
          {/* Entrance ONLY for Ground Floor */}
          {isGround && (
            <>
              <rect {...entrance} fill="#e1d9d1" stroke="#23395d" strokeWidth={4} />
              <text
                x={entrance.x + entrance.width / 2}
                y={entrance.y + 0.67 * entrance.height}
                textAnchor="middle"
                fontSize={22}
                fill="#23395d"
                fontWeight="bold"
                style={labelStyle}
              >
                Entrance
              </text>
              {/* Provost Office */}
              <rect
                x={provostOffice.x}
                y={provostOffice.y}
                width={provostOffice.width}
                height={provostOffice.height}
                fill="#ffe5b4"
                stroke="#b48e2e"
                strokeWidth={3}
                rx={8}
              />
              <text
                x={provostOffice.x + provostOffice.width / 2}
                y={provostOffice.y + provostOffice.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#b48e2e"
                style={labelStyle}
              >
                Provost Office
              </text>
              {/* Canteen */}
              <rect
                x={canteenOrPrayerRoom.x}
                y={canteenOrPrayerRoom.y}
                width={canteenOrPrayerRoom.width}
                height={canteenOrPrayerRoom.height}
                fill="#e3f6cb"
                stroke="#5b8c32"
                strokeWidth={3}
                rx={8}
              />
              <text
                x={canteenOrPrayerRoom.x + canteenOrPrayerRoom.width / 2}
                y={canteenOrPrayerRoom.y + canteenOrPrayerRoom.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#5b8c32"
                style={labelStyle}
              >
                Canteen
              </text>
              {/* Dining */}
              <rect
                x={dining.x}
                y={dining.y}
                width={dining.width}
                height={dining.height}
                fill="#ffe5e5"
                stroke="#d15656"
                strokeWidth={3}
                rx={8}
              />
              <text
                x={dining.x + dining.width / 2}
                y={dining.y + dining.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#d15656"
                style={labelStyle}
              >
                Dining
              </text>
              {/* Water Tank */}
              <rect
                x={watertank.x}
                y={watertank.y}
                width={watertank.width}
                height={watertank.height}
                fill="#d8f3ff"
                stroke="#468faf"
                strokeWidth={3}
                rx={8}
              />
              <text
                x={watertank.x + watertank.width / 2}
                y={watertank.y + watertank.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#468faf"
                style={labelStyle}
              >
                Water
              </text>
              {/* Kitchen 1 */}
              <rect
                x={kitchen1.x}
                y={kitchen1.y}
                width={kitchen1.width}
                height={kitchen1.height}
                fill="#fff7e0"
                stroke="#e6b800"
                strokeWidth={3}
                rx={7}
              />
              <text
                x={kitchen1.x + kitchen1.width / 2}
                y={kitchen1.y + kitchen1.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#a67c00"
                style={labelStyle}
              >
                Kitchen
              </text>
              {/* Kitchen 2 */}
              <rect
                x={kitchen2.x}
                y={kitchen2.y}
                width={kitchen2.width}
                height={kitchen2.height}
                fill="#fff7e0"
                stroke="#e6b800"
                strokeWidth={3}
                rx={7}
              />
              <text
                x={kitchen2.x + kitchen2.width / 2}
                y={kitchen2.y + kitchen2.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#a67c00"
                style={labelStyle}
              >
                Kitchen
              </text>
            </>
          )}
          {/* Kitchen for 1st, 2nd, 3rd floor */}
          {(floor === "1st Floor" || floor === "2nd Floor" || floor === "3rd Floor") && (
            <>
              <rect
                x={upstairKitchen.x}
                y={upstairKitchen.y}
                width={upstairKitchen.width}
                height={upstairKitchen.height}
                fill="#fff7e0"
                stroke="#e6b800"
                strokeWidth={3}
                rx={7}
              />
              <text
                x={upstairKitchen.x + upstairKitchen.width / 2}
                y={upstairKitchen.y + upstairKitchen.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#a67c00"
                style={labelStyle}
              >
                Kitchen
              </text>
            </>
          )}
          {/* Reading room for 1st floor */}
          {floor === "1st Floor" && (
            <>
              <rect
                x={readingRoom.x}
                y={readingRoom.y}
                width={readingRoom.width}
                height={readingRoom.height}
                fill="#e0f7fa"
                stroke="#00bcd4"
                strokeWidth={3}
                rx={7}
              />
              <text
                x={readingRoom.x + readingRoom.width / 2}
                y={readingRoom.y + readingRoom.height / 2 + 7}
                textAnchor="middle"
                fontSize={16}
                fill="#00796b"
                style={labelStyle}
              >
                Reading Room
              </text>
            </>
          )}
          {/* Prayer room for 2nd floor at canteen's place */}
          {floor === "2nd Floor" && (
            <>
              <rect
                x={canteenOrPrayerRoom.x}
                y={canteenOrPrayerRoom.y}
                width={canteenOrPrayerRoom.width}
                height={canteenOrPrayerRoom.height}
                fill="#e6e6fa"
                stroke="#7c5fe6"
                strokeWidth={3}
                rx={8}
              />
              <text
                x={canteenOrPrayerRoom.x + canteenOrPrayerRoom.width / 2}
                y={canteenOrPrayerRoom.y + canteenOrPrayerRoom.height / 2 + 6}
                textAnchor="middle"
                fontSize={16}
                fill="#7c5fe6"
                style={labelStyle}
              >
                Prayer
              </text>
            </>
          )}
          {/* Washrooms for every floor */}
          {washrooms.map((w, i) => (
            <g key={i}>
              <rect
                x={w.x}
                y={w.y}
                width={washroomWidth}
                height={washroomHeight}
                fill="#e5e5f7"
                stroke="#6c63ff"
                strokeWidth={3}
                rx={5}
              />
              <text
                x={w.x + washroomWidth / 2}
                y={w.y + washroomHeight / 2 + 7}
                textAnchor="middle"
                fontSize={14}
                fill="#6c63ff"
                style={labelStyle}
              >
                Washroom
              </text>
            </g>
          ))}
          {/* Block labels */}
          <text
            x={70 * SCALE}
            y={60 * SCALE}
            fontSize={28}
            fill="#325c46"
            fontWeight="bold"
            style={labelStyle}
          >
            A Block
          </text>
          <text
            x={420 * SCALE}
            y={60 * SCALE}
            fontSize={28}
            fill="#325c46"
            fontWeight="bold"
            textAnchor="end"
            style={labelStyle}
          >
            B Block
          </text>
          <text
            x={120 * SCALE}
            y={260 * SCALE}
            fontSize={28}
            fill="#7b4931"
            fontWeight="bold"
            style={labelStyle}
          >
            D Block
          </text>
          <text
            x={300 * SCALE}
            y={260 * SCALE}
            fontSize={28}
            fill="#7b4931"
            fontWeight="bold"
            style={labelStyle}
          >
            C Block
          </text>
          {/* Field labels, only on ground floor */}
          {showFieldLabels && (
            <>
              <text x={180 * SCALE} y={175 * SCALE} fontSize={21} fill="#49a893" style={labelStyle}>
                Field
              </text>
              <text x={280 * SCALE} y={175 * SCALE} fontSize={21} fill="#49a893" style={labelStyle}>
                Field
              </text>
            </>
          )}
          {/* Walkway label only for ground */}
          {isGround && (
            <text
              x={240 * SCALE}
              y={180 * SCALE}
              fontSize={18}
              fill="#1d3557"
              fontWeight="bold"
              textAnchor="middle"
              style={labelStyle}
              transform={`rotate(-90 ${240 * SCALE},${180 * SCALE})`}
            >
              Walk
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

const FLOORS = [
  { label: "Ground Floor", key: "ground" },
  { label: "1st Floor", key: "first" },
  { label: "2nd Floor", key: "second" },
  { label: "3rd Floor", key: "third" },
];

export default function HallLayoutPage() {
  const [showFloors, setShowFloors] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-sans flex flex-col">
        <header className="w-full bg-black shadow">
        <div className="max-w-7xl w-full mx-auto flex items-center gap-4 py-4 px-6">
          <img
            src={SUST_LOGO}
            alt="SUST Logo"
            className="w-20 h-20 object-contain bg-white rounded-full border border-yellow-300 shadow"
          />
          <div className="flex flex-col">
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              Begum Sirajunnesa Chowdhury Hall
            </h1>
            <span className="text-[13px] md:text-sm text-yellow-100 tracking-wide font-sans leading-tight mt-1">
              Shahjalal University of Science and Technology, Sylhet
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-10 px-3 w-full">
        <h2 className="font-heading text-3xl md:text-4xl text-center font-bold text-black mb-8 mt-2 drop-shadow">
          Hall Layout Overview
        </h2>
        <section className="w-full flex flex-col gap-12 items-center justify-center mb-12 max-w-4xl mx-auto">
          {/* Hall map image */}
          <figure className="w-full flex flex-col items-center">
            <img
              src={HALL_MAP_IMAGE}
              alt="Hall Map"
              className="rounded-3xl shadow-xl border-4 border-yellow-400 bg-white object-contain transition-transform hover:scale-105 duration-300"
              style={{
                width: "100%",
                maxWidth: "600px",
                maxHeight: "600px",
                height: "auto",
                display: "block",
              }}
            />
            <figcaption className="text-center text-gray-700 text-base mt-2 italic">
              Official map of Begum Sirajunnesa Chowdhury Hall premises
            </figcaption>
          </figure>
          
          {/* Schematic Top View Button or Floors */}
          <div className="w-full flex flex-col items-center">
            <button
              className={`mb-7 px-7 py-4 rounded-2xl bg-[#23395d] hover:bg-yellow-400 hover:text-black text-yellow-100 font-heading font-semibold text-lg shadow-lg border-2 border-yellow-400 transition focus:outline-none ${
                showFloors ? "hidden" : ""
              }`}
              onClick={() => setShowFloors(true)}
            >
              Show Schematic Top View
            </button>
            {showFloors && (
              <div className="flex flex-col gap-10 w-full">
                {FLOORS.map((floor) => (
                  <div key={floor.key} className="flex flex-col items-center">
                    <SchematicSVG floor={floor.label} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner flex flex-col items-center gap-2">
        <div>
          &copy; {new Date().getFullYear()} Begum Sirajunnesa Chowdhury Hall, SUST.
        </div>
        <Link
          to="/"
          className="inline-block mt-1 px-6 py-2 rounded-xl bg-black text-yellow-300 font-heading font-semibold text-sm shadow hover:bg-yellow-500 hover:text-black border border-black transition"
        >
          Home
        </Link>
      </footer>
    </div>
  );
}