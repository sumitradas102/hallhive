import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SUST_LOGO = "/sust-logo.png";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetch("/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const nowISO = new Date().toISOString();
        const upcoming = data.filter(ev => ev.date >= nowISO).sort((a, b) => a.date.localeCompare(b.date));
        const past = data.filter(ev => ev.date < nowISO).sort((a, b) => b.date.localeCompare(a.date));
        setEvents([...upcoming, ...past]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Could not load events.");
        setLoading(false);
      });
    const interval = setInterval(() => setNow(new Date()), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const upcomingEvents = events.filter(ev => new Date(ev.date) >= now);
  const pastEvents = events.filter(ev => new Date(ev.date) < now);

  function getCardBorder(date) {
    const eventDate = new Date(date);
    if (eventDate >= now) return "border-green-400";
    return "border-gray-300 opacity-80";
  }
  function getCardBg(date) {
    const eventDate = new Date(date);
    if (eventDate >= now) return "bg-gradient-to-br from-green-50 via-yellow-50 to-white";
    return "bg-gradient-to-br from-gray-50 via-yellow-50 to-white";
  }

  // Professional empty state and error state components
  function EmptyState({ type = "upcoming" }) {
    return (
      <div className="flex flex-col items-center justify-center py-14 animate-fadeIn">
        <svg width={72} height={72} fill="none" viewBox="0 0 72 72" className="mb-2">
          <circle cx="36" cy="36" r="34"
            fill={type === "past" ? "#f3f4f6" : "#e0f2fe"}
            stroke={type === "past" ? "#9ca3af" : "#3b82f6"}
            strokeWidth="3"
          />
          <path d="M20 44c0-9 7-16 16-16s16 7 16 16"
            stroke={type === "past" ? "#9ca3af" : "#3b82f6"}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="32" y="50" width="8" height="8" rx="4"
            fill={type === "past" ? "#9ca3af" : "#3b82f6"}
          />
        </svg>
        <div className={`text-lg font-semibold mb-1 ${type === "past" ? "text-[#4b5563]" : "text-[#2563eb]"}`}>
          {type === "past" ? "No Past Events" : "No Upcoming Events"}
        </div>
        <div className="text-gray-500 mb-2 text-center max-w-xs">
          {type === "past"
            ? "No past events have been recorded yet."
            : "There are currently no upcoming events scheduled.\nPlease check back soon!"}
        </div>
      </div>
    );
  }

  function ErrorState() {
    return (
      <div className="flex flex-col items-center justify-center py-10 animate-fadeIn">
        <svg width={72} height={72} fill="none" viewBox="0 0 72 72" className="mb-2">
          <circle cx="36" cy="36" r="34" fill="#fef3c7" stroke="#f59e42" strokeWidth="3"/>
          <path d="M24 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#f59e42" strokeWidth="3" strokeLinecap="round"/>
          <rect x="32" y="44" width="8" height="8" rx="4" fill="#f59e42"/>
        </svg>
        <div className="text-xl font-semibold text-[#b45309] mb-1">Events Service Unavailable</div>
        <div className="text-gray-500 mb-2 text-center max-w-xs">
          We couldn't connect to our events server.<br/>
          Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-yellow-50 to-white font-sans flex flex-col">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10 px-3 w-full">
        <h2 className="font-heading text-3xl md:text-4xl text-center font-bold text-black mb-2 mt-2 drop-shadow">
          Hall Events & Activities
        </h2>
        <p className="text-center text-base md:text-lg text-gray-700 mb-8">
          Stay up to date with all the latest and past events at our hall.
        </p>
        <section className="w-full max-w-5xl mx-auto">
          <div className="mb-6">
            <h3 className="font-heading text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-green-400 rounded-full"></span>
              Upcoming Events
            </h3>
            {loading ? (
              <div className="text-center text-gray-500 py-10">Loading events...</div>
            ) : error ? (
              <ErrorState />
            ) : upcomingEvents.length === 0 ? (
              <EmptyState type="upcoming" />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-7" role="list">
                {upcomingEvents.map((event, idx) => (
                  <li
                    key={event._id || event.id}
                    className={`
                      group relative
                      transition
                      ${getCardBg(event.date)} 
                      border-2 ${getCardBorder(event.date)} 
                      rounded-2xl 
                      shadow-lg
                      hover:shadow-[0_8px_32px_0_rgba(85,184,120,0.16)]
                      hover:scale-[1.045]
                      focus-within:shadow-xl
                      focus-within:scale-[1.045]
                      duration-300
                      cursor-pointer
                      overflow-hidden
                      animate-fadeInUp
                    `}
                    style={{
                      animationDelay: `${idx * 80}ms`,
                      animationFillMode: "backwards"
                    }}
                  >
                    <button
                      className="w-full text-left rounded-2xl focus:outline-none flex flex-col h-full p-6"
                      onClick={() => setSelected(selected === event._id ? null : event._id)}
                      aria-expanded={selected === event._id}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-heading text-xl md:text-2xl font-bold text-[#23395d] group-hover:text-green-700 transition">
                          {event.title}
                        </div>
                        {event.date && (
                          <span className="ml-auto text-xs px-3 py-1 rounded-lg bg-green-100 text-green-900 font-semibold shadow">
                            {formatDate(event.date)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 font-medium mb-1">
                        {event.location && (
                          <>
                            <svg className="w-4 h-4 mr-1.5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7.03 2 3 6.03 3 11a9 9 0 0018 0c0-4.97-4.03-9-9-9z" />
                            </svg>
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                      <div
                        className={`cool-accordion transition-all duration-400 ease-in-out overflow-hidden ${
                          selected === event._id ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                        aria-hidden={selected !== event._id}
                        style={{
                          transitionProperty: "max-height,opacity,padding",
                        }}
                      >
                        <div className="text-gray-900 text-[15px] md:text-base leading-relaxed animate-slideDown">
                          {event.description}
                          {event.attachment && (
                            <div className="mt-3">
                              <a
                                href={event.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-green-100 border border-green-200 text-green-800 rounded-md font-semibold text-sm hover:bg-green-200 transition"
                              >
                                View Attachment
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        className="absolute top-5 right-6 text-green-400 group-hover:text-green-700 text-2xl transition pointer-events-none select-none"
                        style={{
                          transition: "color 0.2s, transform 0.2s",
                          transform: selected === event._id ? "rotate(180deg) scale(1.3)" : "none",
                          filter: selected === event._id ? "drop-shadow(0 2px 10px #85d88755)" : "none"
                        }}
                      >
                        {selected === event._id ? "−" : "+"}
                      </span>
                      <div className={`absolute left-0 bottom-0 w-full h-1.5 transition-all duration-500 ${selected === event._id ? "bg-gradient-to-r from-green-300 via-yellow-200 to-green-400" : "bg-transparent"}`}/>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Past Events */}
          <div className="mt-10">
            <h3 className="font-heading text-2xl font-bold text-gray-600 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-gray-400 rounded-full"></span>
              Past Events
            </h3>
            {loading ? (
              <div className="text-center text-gray-500 py-10">Loading events...</div>
            ) : error ? (
              <ErrorState />
            ) : pastEvents.length === 0 ? (
              <EmptyState type="past" />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-7" role="list">
                {pastEvents.slice(0, 6).map((event, idx) => (
                  <li
                    key={event._id || event.id}
                    className={`
                      group relative
                      transition
                      ${getCardBg(event.date)} 
                      border-2 ${getCardBorder(event.date)} 
                      rounded-2xl 
                      shadow
                      hover:shadow-[0_6px_24px_0_rgba(128,128,128,0.12)]
                      hover:scale-[1.018]
                      focus-within:shadow-xl
                      focus-within:scale-[1.018]
                      duration-200
                      cursor-pointer
                      overflow-hidden
                      opacity-80
                      animate-fadeInUp
                    `}
                    style={{
                      animationDelay: `${idx * 60}ms`,
                      animationFillMode: "backwards"
                    }}
                  >
                    <button
                      className="w-full text-left rounded-2xl focus:outline-none flex flex-col h-full p-6"
                      onClick={() => setSelected(selected === event._id ? null : event._id)}
                      aria-expanded={selected === event._id}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-heading text-xl md:text-2xl font-bold text-[#23395d] group-hover:text-gray-600 transition">
                          {event.title}
                        </div>
                        {event.date && (
                          <span className="ml-auto text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow">
                            {formatDate(event.date)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-400 font-medium mb-1">
                        {event.location && (
                          <>
                            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7.03 2 3 6.03 3 11a9 9 0 0018 0c0-4.97-4.03-9-9-9z" />
                            </svg>
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                      <div
                        className={`cool-accordion transition-all duration-400 ease-in-out overflow-hidden ${
                          selected === event._id ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                        aria-hidden={selected !== event._id}
                        style={{
                          transitionProperty: "max-height,opacity,padding",
                        }}
                      >
                        <div className="text-gray-900 text-[15px] md:text-base leading-relaxed animate-slideDown">
                          {event.description}
                          {event.attachment && (
                            <div className="mt-3">
                              <a
                                href={event.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-gray-100 border border-gray-200 text-gray-800 rounded-md font-semibold text-sm hover:bg-gray-200 transition"
                              >
                                View Attachment
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        className="absolute top-5 right-6 text-gray-400 group-hover:text-gray-700 text-2xl transition pointer-events-none select-none"
                        style={{
                          transition: "color 0.2s, transform 0.2s",
                          transform: selected === event._id ? "rotate(180deg) scale(1.3)" : "none",
                          filter: selected === event._id ? "drop-shadow(0 2px 10px #aaa5)" : "none"
                        }}
                      >
                        {selected === event._id ? "−" : "+"}
                      </span>
                      <div className={`absolute left-0 bottom-0 w-full h-1.5 transition-all duration-500 ${selected === event._id ? "bg-gradient-to-r from-gray-300 via-yellow-100 to-gray-400" : "bg-transparent"}`}/>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {pastEvents.length > 6 && (
              <div className="text-center text-xs mt-6 text-gray-400">
                (Showing {Math.min(6, pastEvents.length)} of {pastEvents.length} past events)
              </div>
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
      {/* Animations */}
      <style>{`
        .group:focus-within {
          outline: 2px solid #49a893;
        }
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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px);}
          to { opacity: 1; transform: none; }
        }
        .animate-slideDown {
          animation: slideDown 0.35s cubic-bezier(.37,1.41,.64,.99);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.42,1.7,.71,.99); }
      `}</style>
    </div>
  );
}