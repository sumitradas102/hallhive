import { useEffect, useState } from "react";

export default function AdminNoticePage() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", attachment: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch(() => setNotices([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/notices/${editingId}` : "/api/notices";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingId) {
          setNotices(notices.map(n => (n._id === data._id ? data : n)));
        } else {
          setNotices([data, ...notices]);
        }
        setForm({ title: "", content: "", attachment: "" });
        setEditingId(null);
      })
      .catch(() => alert("Failed to save notice"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    fetch(`/api/notices/${id}`, { method: "DELETE" })
      .then(() => setNotices(notices.filter(n => n._id !== id)))
      .catch(() => alert("Failed to delete"));
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white/90 rounded-3xl border-2 border-yellow-200 shadow-2xl animate-fadeInUp">
      <h2 className="text-3xl font-heading font-bold mb-6 text-[#23395d] text-center drop-shadow animate-fadeInUp">
        Admin Notice Management
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-8 bg-gradient-to-tr from-yellow-50 via-yellow-100 to-green-50 p-6 rounded-2xl shadow animate-fadeInUp"
      >
        <input
          type="text"
          placeholder="Notice Title"
          className="border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none text-lg font-semibold"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Write the content of the notice..."
          className="border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-200 focus:outline-none min-h-[72px] resize-y"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (PDF or Image)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-200 file:text-black hover:file:bg-yellow-300"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              try {
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                setForm({ ...form, attachment: data.url });
              } catch {
                alert("Failed to upload file.");
              }
            }}
          />

          {form.attachment && (
            <div className="mt-2 text-sm text-green-700 animate-pulse">
              <a
                href={form.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View Uploaded File
              </a>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-yellow-400 shadow-lg hover:bg-yellow-500 text-black font-bold text-lg transition-all animate-fadeInUp"
          >
            {editingId ? "Update Notice" : "Create Notice"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({ title: "", content: "", attachment: "" });
                setEditingId(null);
              }}
              className="px-6 py-2 rounded-xl bg-gray-300 text-black font-semibold shadow hover:bg-gray-400 transition-all animate-fadeInUp"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* NOTICES LIST */}
      <div className="space-y-5 animate-fadeInUp">
        {notices.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No notices yet.</div>
        ) : (
          notices.map(n => (
            <div
              key={n._id}
              className="bg-white border-2 border-yellow-100 p-5 rounded-xl shadow-md flex flex-col gap-1 hover:shadow-lg transition-all animate-fadeInUp"
            >
              <div className="font-bold text-yellow-700 text-lg mb-1">{n.title}</div>
              <div className="text-gray-800 mb-1">{n.content}</div>
              {n.attachment && (
                <a
                  href={n.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mb-1"
                >
                  View Attachment
                </a>
              )}
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => {
                    setForm({
                      title: n.title,
                      content: n.content,
                      attachment: n.attachment,
                    });
                    setEditingId(n._id);
                  }}
                  className="px-4 py-1 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-lg shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n._id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
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
}