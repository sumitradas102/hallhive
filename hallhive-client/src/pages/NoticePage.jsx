import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SUST_LOGO = "/sust-logo.png";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/notices")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notices");
        return res.json();
      })
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Could not load notices.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-sans flex flex-col">
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

      <main className="flex-1 flex flex-col items-center justify-start py-10 px-3 w-full">
        <h2 className="font-heading text-3xl md:text-4xl text-center font-bold text-black mb-8 mt-2 drop-shadow">
          Hall Notices & Announcements
        </h2>
        <section className="w-full max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-3xl border-2 border-yellow-200 p-6">
            {loading ? (
              <div className="text-center text-gray-500 py-10">Loading notices...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-10">{error}</div>
            ) : (
              <ul className="divide-y divide-yellow-100">
                {notices.length === 0 && (
                  <li className="py-10 text-center text-gray-500 italic">No current notices.</li>
                )}
                {notices.map((notice) => (
                  <li key={notice._id || notice.id} className="py-5 px-2 group hover:bg-yellow-50 rounded-xl transition">
                    <button
                      className="w-full text-left focus:outline-none"
                      onClick={() => setSelected(selected === notice._id ? null : notice._id)}
                      aria-expanded={selected === notice._id}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-heading text-lg md:text-xl font-semibold text-[#23395d] group-hover:text-yellow-600">
                            {notice.title}
                          </span>
                          <span className="block text-xs md:text-sm text-gray-500 mt-1">
                            {notice.date
                              ? new Date(notice.date).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : ""}
                          </span>
                        </div>
                        <span className="ml-4 text-yellow-500 group-hover:text-yellow-700 text-2xl transition">
                          {selected === notice._id ? "−" : "+"}
                        </span>
                      </div>
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          selected === notice._id ? "max-h-96 opacity-100 mt-5" : "max-h-0 opacity-0"
                        }`}
                        aria-hidden={selected !== notice._id}
                      >
                        <div className="text-gray-800 text-[15px] md:text-base leading-relaxed">
                          {notice.content}
                          {notice.attachment && (
                            <div className="mt-3">
                              <a
                                href={notice.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md font-semibold text-sm hover:bg-yellow-200 transition"
                              >
                                View Attachment
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
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
    </div>
  );
}