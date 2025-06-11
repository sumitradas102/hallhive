import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const SUST_LOGO = "/sust-logo.png";

export default function ComplaintPage() {
  const [anonymous, setAnonymous] = useState(false);
  const [complaint, setComplaint] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [complaintTime, setComplaintTime] = useState(null);
  const [student, setStudent] = useState(null);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFeedback("");
    setSubmitting(true);
    const now = new Date();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: student.id,
          subject: "Complaint",
          content: complaint,
          is_anonymous: anonymous
        })
      });
      if (!res.ok) throw new Error("Failed to send complaint");
      setFeedback("✅ Your complaint has been sent to the admin.");
      setComplaintTime(now);
      setShowPreview(true);
      setComplaint("");
    } catch (err) {
      setError("Could not send complaint. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-white font-sans">
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
      <main className="flex-1 w-full flex flex-col justify-center items-center bg-white px-2">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl px-4 md:px-10 py-12 my-12 border-2 border-yellow-300 animate-fadeInUp">
          <div className="flex flex-col items-center mb-5">
            <svg width={60} height={60} viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" fill="#fef08a" stroke="#fde047" strokeWidth="2" />
              <path d="M24 14v10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="24" cy="32" r="2" fill="#ef4444"/>
            </svg>
            <h2 className="font-heading text-2xl font-bold text-[#1a1a1a] mt-2 mb-1 animate-fadeIn">
              Submit a Complaint
            </h2>
            <p className="text-center text-red-600 animate-fadeIn">
              You may complain anonymously or with your name. All complaints go to admin with date &amp; time.
            </p>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 animate-fadeIn">
              <input
                type="checkbox"
                id="anonymous"
                checked={anonymous}
                onChange={() => setAnonymous(a => !a)}
                className="h-5 w-5 accent-yellow-400 border-2 border-yellow-400 rounded-md"
                disabled={submitting}
              />
              <label htmlFor="anonymous" className="font-semibold text-yellow-700 select-none">
                Submit as anonymous
              </label>
            </div>
            {!anonymous && student && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-black text-sm animate-fadeIn">
                <div><span className="font-bold text-red-700">Name:</span> {student.name}</div>
                <div><span className="font-bold text-red-700">Student ID:</span> {student.studentId || student.registrationNumber}</div>
                <div><span className="font-bold text-red-700">Department:</span> {student.department}</div>
                <div><span className="font-bold text-red-700">Batch:</span> {student.batch || student.session}</div>
                <div><span className="font-bold text-red-700">Email:</span> {student.email}</div>
              </div>
            )}
            <div className="flex flex-col">
              <label className="block font-semibold text-red-700 mb-1" htmlFor="complaint">
                Your Complaint
              </label>
              <textarea
                id="complaint"
                className="rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md min-h-[120px] resize-none bg-white transition text-black"
                value={complaint}
                onChange={e => setComplaint(e.target.value)}
                required
                maxLength={1000}
                placeholder="Write your complaint or suggestion here..."
                disabled={submitting}
              />
            </div>
            {feedback && (
              <div className="text-red-800 bg-yellow-50 border border-yellow-300 rounded-xl py-3 px-5 mt-3 text-center shadow animate-fadeIn font-semibold">
                {feedback}
              </div>
            )}
            {error && (
              <div className="text-red-700 bg-red-50 border border-red-200 rounded-xl py-3 px-5 mt-3 text-center shadow animate-fadeIn font-semibold">
                {error}
              </div>
            )}
            <button
              type="submit"
              className={`w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-yellow-300 via-red-400 to-yellow-200 text-black font-extrabold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 border-2 border-yellow-400
                ${submitting || !complaint.trim() ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={submitting || !complaint.trim()}
            >
              <span className="relative z-10">{submitting ? "Submitting..." : "Submit Complaint"}</span>
            </button>
          </form>
          {showPreview && (
            <div className="mt-8 animate-fadeInUp">
              <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="4" fill="#fde047" stroke="#ef4444" strokeWidth="1.4"/>
                  <rect x="7" y="10" width="10" height="6" rx="3" fill="#ef4444"/>
                </svg>
                Admin Dashboard Preview
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-md mb-1">
                <div className="text-black mb-2 whitespace-pre-wrap">{complaint}</div>
                <div className="text-xs text-red-700 mb-1">
                  Submitted {anonymous ? <b>anonymously</b> : <>by <b>{student.name}</b> ({student.studentId})</>}<br />
                  <span className="text-black">Date:</span> {complaintTime && new Date(complaintTime).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Home Button */}
        <div className="w-full flex justify-center mb-10">
          <Link
            to="/"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold text-base px-8 py-3 rounded-xl shadow transition"
          >
            Home
          </Link>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner mt-auto">
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
      `}</style>
    </div>
  );
}