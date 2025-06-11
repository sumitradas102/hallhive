import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SUST_LOGO = "/sust-logo.png";

export default function Complaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [feedbackMessages, setFeedbackMessages] = useState({});

  // Fetch complaints from backend
  useEffect(() => {
    fetch("/api/complaints")
      .then(res => res.json())
      .then(data => {
        setComplaints(data);
        setLoading(false);
      });
  }, []);

  // Update status or feedback in backend
  const updateComplaint = (id, updates) => {
    setLoading(true);
    fetch(`/api/complaints/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then(res => res.json())
      .then(() => {
        // Update local state
        setComplaints(prev =>
          prev.map(c => c.id === id ? { ...c, ...updates } : c)
        );
        setLoading(false);
      });
  };

  const updateStatus = (id, newStatus) => {
    updateComplaint(id, { status: newStatus });
    setMessage(`Status updated to "${newStatus}" for complaint #${id}`);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateFeedback = (id, feedback) => {
    updateComplaint(id, { adminFeedback: feedback });
    setFeedbackMessages(prev => ({ ...prev, [id]: "Saved!" }));
    setTimeout(() => {
      setFeedbackMessages(prev => ({ ...prev, [id]: "" }));
    }, 2000);
  };

  const filteredComplaints = complaints.filter((c) => {
    if (!filterDate) return true;
    const complaintDate = new Date(c.timestamp).toISOString().split("T")[0];
    return complaintDate === filterDate;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-green-50 to-white font-sans flex flex-col">
      <header className="w-full bg-black shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-4 py-4 px-6">
          <img
            src={SUST_LOGO}
            alt="SUST Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white rounded-full border-2 border-yellow-300 shadow-md"
          />
          <div className="flex flex-col">
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow">
              Begum Sirajunnesa Chowdhury Hall
            </h1>
            <span className="text-[13px] md:text-base text-yellow-100 tracking-wide font-sans leading-tight mt-1">
              Shahjalal University of Science and Technology, Sylhet
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#23395d] flex items-center justify-center gap-2">
          <span className="text-2xl">⚙️</span> Admin Complaint Management
        </h1>

        {message && (
          <div className="mb-4 px-4 py-2 bg-green-100 border border-green-400 text-green-800 rounded shadow text-sm">
            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <label className="text-sm font-medium text-gray-700">
            Filter by date:
            <input
              type="date"
              className="ml-2 px-3 py-1.5 border rounded bg-white shadow-sm"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </label>
        </div>

        {filterDate && (
          <p className="text-sm text-gray-700 mb-4">
            Showing complaints from: <span className="font-medium text-indigo-600">{filterDate}</span>
          </p>
        )}

        {loading ? (
          <div className="text-gray-500">Loading complaints...</div>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-center text-gray-600">No complaints found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <li
                key={complaint.id}
                className="relative bg-yellow-50 border border-yellow-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(250,204,21,0.15)] hover:shadow-[0_4px_12px_rgba(250,204,21,0.25)] transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setExpandedId(expandedId === complaint.id ? null : complaint.id)
                }
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-green-800">
                        {complaint.subject || "Complaint"}
                      </h2>
                      <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">
                        {complaint.description}
                      </p>
                      <div className="text-xs text-gray-600 mt-3 space-y-1">
                        <p>
                          Submitted{" "}
                          {complaint.anonymous ? (
                            <strong>anonymously</strong>
                          ) : (
                            <>by {complaint.name} ({complaint.studentId})</>
                          )}
                        </p>
                        <p>Date: {new Date(complaint.timestamp).toLocaleString()}</p>
                        <p>
                          Current Status:{" "}
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold
                              ${complaint.status === "Solved"
                                ? "bg-green-100 text-green-800"
                                : complaint.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"}`}
                          >
                            {complaint.status}
                          </span>
                        </p>
                        {complaint.adminFeedback && (
                          <p className="text-[13px] mt-1 text-black">
                            Admin Feedback: <em>{complaint.adminFeedback}</em>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-indigo-500">{expandedId === complaint.id ? "▲" : "▼"}</div>
                  </div>

                  {expandedId === complaint.id && (
                    <div className="mt-4 space-y-4 transition-all duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-black mb-1">Admin Feedback:</label>
                        <textarea
                          rows={3}
                          placeholder="Add or update feedback..."
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none text-black bg-pink-50"
                          value={complaint.adminFeedback || ""}
                          onChange={(e) => updateFeedback(complaint.id, e.target.value)}
                        />
                        {feedbackMessages[complaint.id] && (
                          <p className="text-green-600 text-xs mt-1">{feedbackMessages[complaint.id]}</p>
                        )}
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Update Status:</label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 rounded bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black z-10"
                          value={complaint.status}
                          onChange={(e) => updateStatus(complaint.id, e.target.value)}
                        >
                          <option value="Not Solved">Not Solved</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Solved">Solved</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
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