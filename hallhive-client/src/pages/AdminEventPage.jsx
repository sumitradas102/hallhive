import React, { useEffect, useState } from "react";

export default function AdminEventPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", description: "", location: "", attachment: "" });
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  const fetchEvents = () => {
    setLoading(true);
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  useEffect(fetchEvents, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle event creation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) return;
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then((newEvent) => {
        setEvents([newEvent, ...events]);
        setForm({ title: "", date: "", description: "", location: "", attachment: "" });
      });
  };

  // Handle event deletion
  const handleDelete = (id) => {
    fetch(`/api/events/${id}`, { method: "DELETE" })
      .then(() => setEvents(events.filter(ev => ev.id !== id)));
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white/90 rounded-3xl border-2 border-yellow-100 shadow-2xl animate-fadeInUp">
      <h2 className="text-3xl font-heading font-bold mb-6 text-[#23395d] text-center drop-shadow">
        Admin Event Management
      </h2>
      <form
        className="flex flex-col gap-3 mb-8 bg-gradient-to-tr from-yellow-50 via-green-50 to-yellow-100 p-6 rounded-2xl shadow animate-fadeInUp"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="bg-yellow-50 text-black placeholder-yellow-600 border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="bg-yellow-50 text-black placeholder-yellow-600 border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="bg-yellow-50 text-black placeholder-yellow-600 border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="attachment"
            placeholder="Attachment URL"
            className="bg-yellow-50 text-black placeholder-yellow-600 border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none flex-1"
            value={form.attachment}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          className="bg-yellow-50 text-black placeholder-yellow-600 border-2 border-yellow-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:outline-none min-h-[64px] resize-y"
          value={form.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-yellow-300 via-green-200 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-[#23395d] font-extrabold py-2 px-6 rounded-xl shadow-lg transition-all text-lg self-end animate-fadeInUp"
        >
          + Add Event
        </button>
      </form>
      <div className="animate-fadeInUp">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No events yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="p-3 text-left font-semibold text-[#23395d]">Title</th>
                  <th className="p-3 text-left font-semibold text-[#23395d]">Date</th>
                  <th className="p-3 text-left font-semibold text-[#23395d]">Location</th>
                  <th className="p-3 text-left font-semibold text-[#23395d]">Attachment</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} className="transition hover:bg-yellow-50">
                    <td className="p-3 font-semibold">{ev.title}</td>
                    <td className="p-3">{ev.date}</td>
                    <td className="p-3">{ev.location}</td>
                    <td className="p-3">
                      {ev.attachment && (
                        <a
                          href={ev.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline hover:text-blue-900 transition"
                        >
                          View
                        </a>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-lg font-bold shadow transition-all"
                        title="Delete event"
                      >
                        Delete
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
}
