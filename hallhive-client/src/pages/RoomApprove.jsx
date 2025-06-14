import React, { useEffect, useState } from "react";

export default function RoomApprove() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all pending room applications with student and room details
  const fetchApplications = () => {
    setLoading(true);
    fetch("/api/admin/applications")
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Approve application: call backend API, update UI
  const handleApprove = (application_id) => {
    fetch(`/api/admin/applications/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application_id })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setApplications(applications.filter(app => app.application_id !== application_id));
      })
      .catch(() => alert("Failed to approve."));
  };

  // Reject application: call backend API, update UI
  const handleReject = (application_id) => {
    fetch(`/api/admin/applications/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application_id })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setApplications(applications.filter(app => app.application_id !== application_id));
      })
      .catch(() => alert("Failed to reject."));
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white/90 rounded-3xl border-2 border-yellow-100 shadow-2xl animate-fadeInUp">
      <h2 className="text-3xl font-heading font-bold mb-8 text-[#23395d] text-center drop-shadow animate-fadeInUp">
        Pending Room Applications
      </h2>
      {loading ? (
        <p className="text-center text-gray-500 animate-fadeInUp">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-600 animate-fadeInUp">No pending applications</p>
      ) : (
        <div className="flex flex-col gap-6">
          {applications.map((app, idx) => (
            <div
              key={app.application_id}
              className="bg-gradient-to-tr from-yellow-50 via-green-50 to-yellow-100 border-2 border-yellow-100 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between animate-fadeInUp"
              style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "backwards" }}
            >
              <div className="space-y-1 flex-1">
                <p><span className="font-bold text-[#23395d]">Student:</span> {' '}
                  <span className="text-[#23395d]">{app.name}</span>
                </p>
               
                <p><span className="font-bold text-[#23395d]">ID:</span> {' '}
                <span className="text-[#23395d]">{app.registrationNumber}</span></p>
                <p><span className="font-bold text-[#23395d]">Room:</span> {' '}
                <span className="text-[#23395d]">{app.room_no}</span></p>
                <p>
                  <span className="font-bold text-[#23395d]">Block:</span> {' '} 
                  <span className="text-[#23395d]">{app.block}</span> |{" "}

                  <span className="font-bold text-[#23395d]">Floor:</span> {' '}
                  
                  <span className="text-[#23395d]">{app.floor}</span>
                </p>
                
                <p>
                  <span className="font-bold text-[#23395d]">Applied At:</span>{" "}
                  <span className="text-gray-700">{new Date(app.applied_at).toLocaleString()}</span>
                </p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0 md:ml-6">
                <button
                  onClick={() => handleApprove(app.application_id)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-400 via-green-300 to-green-500 text-white font-bold shadow hover:scale-105 hover:bg-green-600 transition-all"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(app.application_id)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-400 via-yellow-200 to-red-500 text-white font-bold shadow hover:scale-105 hover:bg-red-600 transition-all"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
