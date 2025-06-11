import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminComplaintPage from "./AdminComplaintPage";
import AdminNoticePage from "./AdminNoticePage";
import AdminEventPage from "./AdminEventPage";
import RoomApprove from "./RoomApprove";
import AllowedStudentsPage from "./AllowedStudentsPage";

const SUST_LOGO = "/sust-logo.png";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdminInfo() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch admin info");
        }
        const data = await res.json();
        setAdmin(data);
        setLoading(false);
      } catch (err) {
        setError("Unable to load admin profile.");
        setLoading(false);
      }
    }
    fetchAdminInfo();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Animation helpers
  function animatedCardStyle(idx) {
    return {
      animation: "fadeInUp 0.65s cubic-bezier(.5,1.7,.84,.67)",
      animationDelay: `${idx * 80}ms`,
      animationFillMode: "backwards"
    };
  }

  function PageContent() {
    switch (page) {
      case "complaints":
        return <AdminComplaintPage />;
      case "notices":
        return <AdminNoticePage />;
      case "events":
        return <AdminEventPage />;
      case "room-approve":
        return <RoomApprove />;
      case "allowedStudentUpload":
        return <AllowedStudentsPage />;
      default:
        return (
          <div className="text-xl text-gray-700 font-semibold animate-fadeInUp">
            Select an option from the sidebar.
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-yellow-50 to-white font-sans flex flex-col">
      {/* Header */}
      <header className="w-full bg-black shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-4 py-4 px-6 relative">
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
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="ml-auto absolute right-4 top-3 bg-yellow-400 text-black font-bold px-5 py-2 rounded-xl shadow hover:bg-yellow-500 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10 px-3 w-full">
        <h2 className="font-heading text-3xl md:text-4xl text-center font-bold text-black mb-6 mt-2 drop-shadow">
          Admin Dashboard
        </h2>
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Admin Info Card */}
          <div
            className="bg-white/90 border-2 border-yellow-100 rounded-3xl shadow-xl p-7 flex-1 flex flex-col items-center animate-fadeInUp"
            style={animatedCardStyle(0)}
          >
            {loading ? (
              <div className="text-gray-500 py-12">Loading your information...</div>
            ) : error ? (
              <div className="text-red-600 py-12">{error}</div>
            ) : admin ? (
              <>
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-yellow-100 to-green-100 border-2 border-green-300 flex items-center justify-center mb-2 shadow">
                  <span className="font-bold text-5xl text-green-700">
                    {admin.name?.[0] || "?"}
                  </span>
                </div>
                <div className="font-heading text-xl font-bold text-[#23395d] mb-1">{admin.name}</div>
                <div className="text-gray-700 mb-2 text-center">{admin.email}</div>
                <table className="text-sm text-left w-full max-w-xs mb-4">
                  <tbody>
                    <tr>
                      <td className="pr-3 py-1 text-[#23395d] font-semibold">Role:</td>
                      <td className="py-1 text-gray-900 capitalize">{admin.role || <span className="text-gray-400">N/A</span>}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <div className="text-gray-400 py-12">No admin data found.</div>
            )}
          </div>

          {/* Action Buttons / Sidebar */}
          <div className="flex flex-col gap-6 justify-center flex-1 min-w-[240px]">
            <button
              type="button"
              onClick={() => setPage("complaints")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-300 text-red-900 font-extrabold text-lg shadow-lg hover:scale-[1.04] hover:shadow-2xl transition duration-200 animate-fadeInUp ${
                page === "complaints" ? "ring-4 ring-yellow-400" : ""
              }`}
              style={animatedCardStyle(1)}
            >
              <svg className="w-7 h-7 text-red-700" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M21 12c0 5-4 9-9 9s-9-4-9-9a9 9 0 0118 0z" stroke="#92400e"/>
                <path d="M9.09 9a3 3 0 015.83 0" stroke="#92400e"/>
              </svg>
              Manage Complaints
            </button>
            <button
              type="button"
              onClick={() => setPage("notices")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-[#1e3a8a] font-extrabold text-lg shadow-lg hover:scale-[1.04] hover:shadow-2xl transition duration-200 animate-fadeInUp ${
                page === "notices" ? "ring-4 ring-yellow-400" : ""
              }`}
              style={animatedCardStyle(2)}
            >
              <svg className="w-7 h-7 text-blue-800" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="#1e3a8a"/>
                <path d="M8 2h8v4H8V2z" stroke="#1e3a8a"/>
              </svg>
              Update Notices
            </button>
            <button
              type="button"
              onClick={() => setPage("events")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-100 via-green-200 to-green-300 text-green-900 font-extrabold text-lg shadow-lg hover:scale-[1.04] hover:shadow-2xl transition duration-200 animate-fadeInUp ${
                page === "events" ? "ring-4 ring-yellow-400" : ""
              }`}
              style={animatedCardStyle(3)}
            >
              <svg className="w-7 h-7 text-green-800" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#22c55e"/>
                <path d="M12 8v4l3 3" stroke="#22c55e"/>
              </svg>
              Add Events
            </button>
            <button
              type="button"
              onClick={() => setPage("room-approve")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 text-yellow-900 font-extrabold text-lg shadow-lg hover:scale-[1.04] hover:shadow-2xl transition duration-200 animate-fadeInUp ${
                page === "room-approve" ? "ring-4 ring-yellow-400" : ""
              }`}
              style={animatedCardStyle(4)}
            >
              <svg className="w-7 h-7 text-yellow-800" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <rect x="4" y="7" width="16" height="13" rx="3" stroke="#eab308" />
                <path d="M8 7V5a4 4 0 018 0v2" stroke="#eab308" />
              </svg>
              Room Approve
            </button>
            <button
              type="button"
              onClick={() => setPage("allowedStudentUpload")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-300 text-[#92400e] font-extrabold text-lg shadow-lg hover:scale-[1.04] hover:shadow-2xl transition duration-200 animate-fadeInUp ${
                page === "allowedStudentUpload" ? "ring-4 ring-yellow-400" : ""
              }`}
              style={animatedCardStyle(5)}
            >
              <svg className="w-7 h-7 text-yellow-800" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke="#eab308"/>
              </svg>
              Add or Remove
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="w-full max-w-5xl mx-auto mt-8 animate-fadeInUp" style={animatedCardStyle(6)}>
          <div className="bg-white/90 border-2 border-yellow-100 rounded-3xl shadow-xl p-7 min-h-[220px]">
            {loading ? (
              <div className="text-gray-500 py-12">Loading admin info...</div>
            ) : error ? (
              <div className="text-red-600 py-12">{error}</div>
            ) : (
              <PageContent />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
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
      {/* Animations */}
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
      `}</style>
    </div>
  );
}