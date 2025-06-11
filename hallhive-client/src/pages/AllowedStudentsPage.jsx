import React, { useEffect, useState, useRef } from "react";

const API_BASE = "/api/allowed-students";

const AllowedStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    room_no: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [importMsg, setImportMsg] = useState("");
  const fileInputRef = useRef();

  // Fetch students
  const fetchStudents = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to load students");
      setStudents(await res.json());
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const handleAdd = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    if (!form.name || !form.email || !form.registrationNumber || !form.room_no) {
      setErr("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.message && data.message.includes("Room is already full")) {
          setErr("Room is already full (max 4 allowed). Choose a different room.");
        } else {
          setErr(data.message || "Failed to add student");
        }
        return;
      }
      setSuccess("Student added!");
      setForm({ name: "", email: "", registrationNumber: "", room_no: "" });
      fetchStudents();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Remove student
  const handleRemove = async (registrationNumber) => {
    if (
      !window.confirm(
        `Are you sure you want to remove student ${registrationNumber}?`
      )
    )
      return;
    setErr("");
    setSuccess("");
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${registrationNumber}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.message || "Failed to remove student");
        return;
      }
      setSuccess("Student removed!");
      fetchStudents();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const onFormChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Export students as CSV
  const handleExport = async () => {
    setImportMsg("");
    setErr("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/export-csv`);
      if (!res.ok) throw new Error("Failed to export CSV");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "allowed-students.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Import students from CSV
  const handleImport = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setImportMsg("");
    const file = fileInputRef.current.files[0];
    if (!file) {
      setImportMsg("Choose a CSV file first.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/import`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setImportMsg(data.message || "Failed to import CSV");
        return;
      }
      setImportMsg(
        `Imported successfully: ${data.message || ""}` +
        (data.errors && data.errors.length
          ? `, ${data.errors.length} errors`
          : "")
      );
      fetchStudents();
      fileInputRef.current.value = "";
    } catch (e) {
      setImportMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white/90 rounded-3xl border-2 border-yellow-100 shadow-2xl animate-fadeInUp">
      <h2 className="text-3xl font-heading font-bold mb-6 text-[#23395d] text-center drop-shadow animate-fadeInUp">
        Allowed Students Management
      </h2>
      <div className="mb-8 bg-gradient-to-tr from-yellow-50 via-green-50 to-yellow-100 p-6 rounded-2xl shadow animate-fadeInUp">
        <h3 className="font-bold text-lg mb-3 text-[#23395d]">Add Student</h3>
        <form
          onSubmit={handleAdd}
          className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.name}
            onChange={onFormChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.email}
            onChange={onFormChange}
            required
          />
          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            className="border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.registrationNumber}
            onChange={onFormChange}
            required
          />
          <input
            type="text"
            name="room_no"
            placeholder="Room No"
            className="border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.room_no}
            onChange={onFormChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-yellow-300 via-green-200 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-[#23395d] font-extrabold py-2 px-6 rounded-xl shadow-lg transition-all text-lg"
          >
            Add
          </button>
        </form>
        <div className="flex flex-wrap gap-3 items-center mt-6">
          <button
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
            onClick={handleExport}
            disabled={loading}
          >
            Export as CSV
          </button>
          <form onSubmit={handleImport} className="flex items-center gap-2">
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              className="block border border-yellow-200 rounded py-1 px-2"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
              disabled={loading}
            >
              Import CSV
            </button>
          </form>
          {importMsg && (
            <span className="ml-4 text-sm text-blue-800">{importMsg}</span>
          )}
        </div>
        {err && <div className="text-red-600 mt-2">{err}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </div>
      <div className="animate-fadeInUp">
        <h3 className="font-bold text-lg mb-2 text-[#23395d]">Allowed Students List</h3>
        {loading && <div>Loading...</div>}
        {!loading && students.length === 0 && (
          <div className="text-gray-400">No students found.</div>
        )}
        {!loading && students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl shadow">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="p-3 text-left font-semibold text-[#23395d]">Name</th>
                  <th className="p-3 text-left font-semibold text-[#23395d]">Email</th>
                  <th className="p-3 text-left font-semibold text-[#23395d]">Registration No</th>
                  <th className="p-3 text-left font-semibold text-[#23395d]">Room No</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => (
                  <tr
                    key={s.registrationNumber}
                    className="transition hover:bg-yellow-50 animate-fadeInUp"
                    style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "backwards" }}
                  >
                    <td className="p-3 text-black">{s.name}</td>
                    <td className="p-3 text-black">{s.email}</td>
                    <td className="p-3 text-black">{s.registrationNumber}</td>
                    <td className="p-3 text-black">{s.room_no}</td>
                    <td className="p-3">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-lg font-bold shadow transition-all"
                        onClick={() => handleRemove(s.registrationNumber)}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
};

export default AllowedStudentsPage;