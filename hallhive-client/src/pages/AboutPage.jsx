import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Update these paths to match your /public folder
const SUST_LOGO = "/sust-logo.png";
const CAROUSEL_IMAGES = [
  "/hall1.jpg",
  "/hall2.jpg",
  "/hall3.jpg",
  "/hall4.jpg",
];

export default function AboutPage() {
  // Carousel logic
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="min-h-screen w-screen bg-white font-sans flex flex-col">
      {/* Header */}
     <header className="w-full bg-black shadow">
        <div className="w-full max-w-7xl mx-auto flex items-center gap-4 py-4 px-6">
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

      {/* Carousel - fills width */}
      <section className="relative w-full flex-1 min-h-[280px] md:min-h-[28vw] bg-white overflow-hidden shadow">
        {CAROUSEL_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={src}
              alt={`Hall view ${i + 1}`}
              className="w-full h-full object-cover brightness-75"
              draggable="false"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute bottom-3 right-4 text-white text-xs font-bold opacity-60 pointer-events-none select-none" style={{textShadow:"0 1px 3px #000,0 0 6px #000"}}>
              Begum Sirajunnesa Chowdhury Hall
            </div>
          </div>
        ))}
        {/* Carousel Dots */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
          {CAROUSEL_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full border-2 border-yellow-400 transition ${
                i === current ? "bg-yellow-400" : "bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Content  */}
      <main className="flex-grow flex flex-col justify-center items-center bg-white px-2 py-8">
        <div className="w-full max-w-3xl bg-white/90 shadow rounded-2xl p-8">
          <h2 className="font-heading text-3xl font-bold text-black mb-6 text-center">
            About Begum Sirajunnesa Chowdhury Hall
          </h2>
          <div className="text-black text-lg font-sans text-center mb-6">
            <p className="mb-4">
              <b>Begum Sirajunnesa Chowdhury Hall</b> is a dedicated residential facility for female students at Shahjalal University of Science and Technology (SUST), Sylhet. Established to encourage women's education and empowerment, the hall offers a safe, supportive, and vibrant living environment.
            </p>
            <p className="mb-4">
              The hall is named in honor of Begum Sirajunnesa Chowdhury, a renowned social worker and philanthropist who championed the cause of women's rights and education in Bangladesh. The residence is committed to fostering a sense of community, academic excellence, and personal growth among its residents.
            </p>
            <p className="mb-4">
              With modern amenities including spacious rooms, a well-equipped common room, computer and internet facilities, a library, and a hygienic dining hall, the hall ensures that students have everything they need for a comfortable and enriching university life.
            </p>
            <p className="mb-4">
              Our hall regularly organizes cultural events, seminars, and workshops to promote leadership, creativity, and social responsibility among students. The dedicated administration and staff are always available to provide guidance and support.
            </p>
            <p>
              At Begum Sirajunnesa Chowdhury Hall, we take pride in our tradition of nurturing talented and confident women leaders ready to contribute to society and the nation.
            </p>
          </div>
        </div>
      </main>

      {/* Home Button */}
      <div className="flex justify-center mb-8">
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold text-lg px-8 py-3 rounded-xl shadow transition"
        >
          Home
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner mt-auto">
        &copy; {new Date().getFullYear()} Begum Sirajunnesa Chowdhury Hall, SUST.
      </footer>
    </div>
  );
}