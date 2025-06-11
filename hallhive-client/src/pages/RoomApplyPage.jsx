import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SUST_LOGO = "/sust-logo.png";
const BLOCKS = ["A", "B", "C", "D"];
const FLOORS = [0, 1, 2, 3];
const ROOMS_PER_BLOCK = 10;

function getFloorLabel(floor) {
  if (floor === 0) return "Ground";
  if (floor === 1) return "1st";
  if (floor === 2) return "2nd";
  if (floor === 3) return "3rd";
  return `${floor}th`;
}

function getRoomNumbers(floor) {
  const base = (floor + 1) * 100;
  return Array.from({ length: ROOMS_PER_BLOCK }, (_, i) => base + (i + 1));
}

function RoomTicket({ block, floor, room }) {
  if (!block || floor === "" || !room) return null;
  const roomCode = `${block}-${(Number(floor) + 1)}${String(room).slice(-2)}`;
  return (
    <div className="w-full flex justify-center mt-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-lg px-8 py-4 border-2 border-yellow-400 flex items-center gap-4 ticket-effect">
        <svg width={40} height={40} fill="none" viewBox="0 0 48 48" className="mr-2">
          <rect x="4" y="8" width="40" height="32" rx="8" fill="#fef08a" stroke="#fde047" strokeWidth="2"/>
          <rect x="18" y="16" width="12" height="8" rx="2" fill="#f87171"/>
        </svg>
        <span className="font-mono text-2xl tracking-widest text-black font-extrabold">{roomCode}</span>
        <span className="ml-4 px-3 py-1 rounded bg-yellow-300 text-black font-bold text-xs shadow-sm">
          Selected Room
        </span>
        <div className="absolute -left-4 rounded-full w-8 h-8 bg-white border-4 border-yellow-300 shadow-lg ticket-cut" />
        <div className="absolute -right-4 rounded-full w-8 h-8 bg-white border-4 border-yellow-300 shadow-lg ticket-cut" />
      </div>
    </div>
  );
}

function Modal({ show, onClose, onConfirm, roomCode, student, loading }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn border-2 border-yellow-400">
        <button className="absolute top-3 right-3 text-xl text-red-500 hover:text-black transition" onClick={onClose} aria-label="Close Modal">&times;</button>
        <h3 className="font-heading text-xl font-bold text-center mb-2 text-black">Confirm Room Application</h3>
        <RoomTicket block={roomCode.split("-")[0]} floor={parseInt(roomCode.split("-")[1][0]) - 1} room={parseInt(roomCode.split("-")[1].slice(1))} />
        <div className="text-center mt-4 mb-2 text-black">
          You're about to apply for room <b>{roomCode}</b>. Confirm your details:
        </div>
        <table className="w-full text-sm mb-4">
          <tbody>
            <tr>
              <td className="font-semibold text-black pr-2 py-1">Name:</td>
              <td className="py-1">{student.name}</td>
            </tr>
            <tr>
              <td className="font-semibold text-black pr-2 py-1">Student ID:</td>
              <td className="py-1">{student.studentId || student.registrationNumber}</td>
            </tr>
            <tr>
              <td className="font-semibold text-black pr-2 py-1">Department:</td>
              <td className="py-1">{student.department}</td>
            </tr>
            <tr>
              <td className="font-semibold text-black pr-2 py-1">Batch:</td>
              <td className="py-1">{student.batch || student.session}</td>
            </tr>
            <tr>
              <td className="font-semibold text-black pr-2 py-1">Email:</td>
              <td className="py-1">{student.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-3 mt-6 justify-center">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2 rounded-xl bg-yellow-100 border border-yellow-400 text-black font-semibold hover:bg-yellow-200 transition"
            disabled={loading}
          >Cancel</button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-6 py-2 rounded-xl bg-yellow-400 border-2 border-yellow-400 text-black font-bold shadow hover:bg-yellow-500 hover:text-red-600 hover:border-red-400 transition"
            disabled={loading}
          >{loading ? "Submitting..." : "Yes, Apply"}</button>
        </div>
      </div>
    </div>
  );
}

function AdminPreview({ show, roomCode, student, time }) {
  if (!show) return null;
  return (
    <div className="max-w-xl mx-auto mt-10 mb-16 p-7 rounded-3xl shadow-2xl bg-white border-2 border-yellow-400 animate-fadeIn">
      <h4 className="font-heading text-lg font-bold text-yellow-700 mb-2 flex items-center gap-2">
        <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="12" rx="3" fill="#fef08a" stroke="#fde047" strokeWidth="1.4"/>
          <rect x="7" y="11" width="10" height="6" rx="2" fill="#f87171" />
          <rect x="10" y="7" width="4" height="4" rx="2" fill="#facc15"/>
        </svg>
        Admin Notification Preview
      </h4>
      <div className="text-black mb-2">
        <b>{student.name}</b> (<span className="text-yellow-900">{student.studentId || student.registrationNumber}</span>) has applied for room <span className="bg-yellow-200 px-2 py-1 rounded font-mono text-black">{roomCode}</span>.
      </div>
      <div className="text-xs text-black mb-1">
        Department: {student.department} | Batch: {student.batch || student.session} | Email: {student.email}
      </div>
      <div className="text-xs text-red-700">Application Time: {new Date(time).toLocaleString()}</div>
    </div>
  );
}

export default function RoomApplyPage() {
  const [student, setStudent] = useState(null);
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [adminPreview, setAdminPreview] = useState(null);

  // Fetch authenticated student info for display, just like ComplaintPage
  useEffect(() => {
    async function fetchStudent() {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/student/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setStudent(await res.json());
      }
    }
    fetchStudent();
  }, []);

  // Real-time room availability fetch
  useEffect(() => {
    if (block && floor !== "") {
      setLoadingRooms(true);
      setOccupiedRooms([]);
      fetch(`/api/room-availability?block=${block}&floor=${floor}`)
        .then(res => res.json())
        .then(data => setOccupiedRooms(data.occupied || []))
        .catch(() => setOccupiedRooms([]))
        .finally(() => setLoadingRooms(false));
    } else {
      setOccupiedRooms([]);
    }
  }, [block, floor]);

  const selectableFloors = block === "A" ? FLOORS.slice(1) : FLOORS;
  const selectableRooms = (block && floor !== "") ? getRoomNumbers(Number(floor)) : [];
  const roomCode =
    block && floor !== "" && room
      ? `${block}-${(Number(floor) + 1)}${String(room).slice(-2)}`
      : "";

  function handleOpenModal(e) {
    e.preventDefault();
    setModalOpen(true);
    setError("");
  }

  async function handleModalConfirm() {
  setSubmitting(true);
  setError("");
  setFeedback("");
  try {
    const token = localStorage.getItem("token"); // must be stored at login
    const res = await fetch("/api/room-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        room_no: roomCode // only this field!
      }),
    });
    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(errMsg || "Failed to submit application.");
    }
    setFeedback("🎉 Your application has been sent to the admin.");
      const now = new Date();
      setAdminPreview({ roomCode, student, time: now });
      setBlock(""); setFloor(""); setRoom("");
      setOccupiedRooms([]);
      setModalOpen(false);
    } catch (err) {
      setError("Could not submit the application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!student) return <div className="min-h-screen flex items-center justify-center font-bold text-lg">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col">
      {/* Header */}
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
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-2 pt-6 pb-6 w-full bg-white">
        <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl border-2 border-yellow-400 overflow-hidden animate-fadeInUp">
          {/* Sidebar illustration */}
          <div className="hidden md:flex flex-col items-center justify-center p-8 bg-yellow-50 border-r-2 border-yellow-400 min-w-[230px]">
            <svg width={120} height={120} viewBox="0 0 144 144" fill="none">
              <rect x="16" y="32" width="112" height="80" rx="20" fill="#fef08a" stroke="#fde047" strokeWidth="3"/>
              <rect x="40" y="60" width="64" height="36" rx="9" fill="#f87171" />
              <rect x="62" y="40" width="20" height="20" rx="6" fill="#facc15"/>
              <g>
                <circle cx="36" cy="52" r="6" fill="#f87171"/>
                <circle cx="108" cy="52" r="4" fill="#f87171"/>
                <circle cx="36" cy="92" r="4" fill="#fde047"/>
                <circle cx="108" cy="92" r="6" fill="#fde047"/>
              </g>
            </svg>
            <span className="mt-4 text-center text-yellow-700 font-bold text-lg">Choose Your Room</span>
            <span className="text-black text-xs mt-1">Block, Floor, and Room</span>
          </div>
          {/* Form Area */}
          <div className="flex-1 px-4 md:px-10 py-12 flex flex-col">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-black mb-1 text-center drop-shadow">
              Room Allocation Application
            </h2>
            {/* Stepper */}
            <div className="flex items-center justify-center gap-0 md:gap-2 mb-7 animate-fadeIn">
              {["Block", "Floor", "Room"].map((label, idx) => (
                <div key={label} className="flex items-center gap-0">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${(!block && idx === 0) || (block && !floor && idx === 1) || (block && floor !== "" && !room && idx === 2) ? "border-yellow-400 bg-yellow-200 text-black" : (idx < (block ? (floor !== "" ? (room ? 3 : 2) : 1) : 0)) ? "border-red-500 bg-red-100 text-black" : "border-black bg-white text-black"} font-bold text-lg shadow-md transition-all`}>
                    {idx + 1}
                  </div>
                  <span className={`ml-2 mr-3 text-base font-semibold ${(!block && idx === 0) || (block && !floor && idx === 1) || (block && floor !== "" && !room && idx === 2) ? "text-yellow-700" : (idx < (block ? (floor !== "" ? (room ? 3 : 2) : 1) : 0)) ? "text-red-700" : "text-black"}`}>{label}</span>
                  {idx < 2 && <span className="w-10 h-1 bg-gradient-to-r from-yellow-200 to-red-200 rounded-full" />}
                </div>
              ))}
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleOpenModal}>
              {/* Block */}
              <div className="flex flex-col">
                <label className="block font-semibold text-black mb-1" htmlFor="block">
                  Block
                </label>
                <select
                  id="block"
                  className={`rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-md transition ${block ? "bg-yellow-100" : "bg-white"}`}
                  value={block}
                  onChange={e => {
                    setBlock(e.target.value);
                    setFloor(""); setRoom("");
                  }}
                  required
                  disabled={submitting}
                >
                  <option value="">Select Block</option>
                  {BLOCKS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              {/* Floor */}
              <div className="flex flex-col">
                <label className="block font-semibold text-black mb-1" htmlFor="floor">
                  Floor
                </label>
                <select
                  id="floor"
                  className={`rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-md transition ${floor !== "" ? "bg-yellow-100" : "bg-white"}`}
                  value={floor}
                  onChange={e => {
                    setFloor(e.target.value);
                    setRoom("");
                  }}
                  required
                  disabled={submitting || !block}
                >
                  <option value="">Select Floor</option>
                  {selectableFloors.map(f => (
                    <option key={f} value={f}>{getFloorLabel(f)}</option>
                  ))}
                </select>
              </div>
              {/* Room */}
              <div className="flex flex-col">
                <label className="block font-semibold text-black mb-1" htmlFor="room">
                  Room {block && floor !== "" && (
                    <span className="ml-2 text-xs text-red-400">(occupied rooms disabled)</span>
                  )}
                </label>
                <select
                  id="room"
                  className={`rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md transition ${room ? "bg-red-50" : "bg-white"}`}
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                  required
                  disabled={submitting || !block || floor === ""}
                >
                  <option value="">Select Room</option>
                  {selectableRooms.map(r => {
                    const isOccupied = occupiedRooms.includes(r);
                    return (
                      <option
                        key={r}
                        value={r}
                        disabled={isOccupied}
                        style={isOccupied ? { color: "#ef4444", background: "#f3f4f6" } : {}}
                      >
                        {`${block}-${(Number(floor) + 1)}${String(r).slice(-2)}`} {isOccupied ? "(Occupied)" : ""}
                      </option>
                    );
                  })}
                </select>
                {loadingRooms && <div className="text-xs text-black mt-1">Loading room availability...</div>}
              </div>
              <RoomTicket block={block} floor={floor} room={room} />
              {/* Feedback/Error */}
              {feedback && (
                <div className="text-black bg-yellow-100 border border-yellow-400 rounded-xl py-3 px-5 mt-3 text-center shadow animate-fadeIn font-semibold">
                  {feedback}
                </div>
              )}
              {error && (
                <div className="text-red-800 bg-red-50 border border-red-400 rounded-xl py-3 px-5 mt-3 text-center shadow animate-fadeIn font-semibold">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className={`w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-red-100 text-black font-extrabold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 relative overflow-hidden group border-2 border-yellow-400
                  ${submitting || !block || floor === "" || !room ? "opacity-50 cursor-not-allowed" : ""}
                `}
                disabled={submitting || !block || floor === "" || !room}
              >
                <span className="relative z-10">Apply for Room</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-yellow-100 via-red-50 to-yellow-50" />
              </button>
            </form>
            <div className="text-xs text-black text-center mt-6">
              <span className="font-semibold">Note:</span> A Block does not have Ground Floor rooms.<br/>
              Each block-floor has 10 rooms. Example: <code className="bg-yellow-100 rounded px-1">B-203</code> means <b>B</b> block, <b>1st</b> floor, <b>3rd</b> room.
            </div>
          </div>
        </div>
        <Modal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
          roomCode={roomCode}
          student={student}
          loading={submitting}
        />
        <AdminPreview show={!!adminPreview} {...adminPreview} />
      </main>
      {/* Footer */}
     <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner">
        &copy; {new Date().getFullYear()} Begum Sirajunnesa Chowdhury Hall, SUST.
      </footer>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(.5,1.7,.84,.67);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.42,1.7,.71,.99); }
        .ticket-effect {
          box-shadow: 0 4px 24px 0 #fde04740;
          border-radius: 30px;
          position: relative;
          overflow: visible;
        }
        .ticket-cut {
          box-shadow: 0 0 8px #fde047;
        }
        select, select option {
          color: #000 !important;
          background: #fff !important;
        }
      `}</style>
    </div>
  );
}