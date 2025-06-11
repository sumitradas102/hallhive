import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Update these paths to match your /public folder
const SUST_LOGO = "/sust-logo.png";
const PROVOST_PHOTO = "/provost.jpg";
const CAROUSEL_IMAGES = [
  "/hall1.jpg",
  "/hall2.jpg",
  "/hall3.jpg",
  "/hall4.jpg",
];

export default function HomePage() {
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
    <div className="min-h-screen w-full bg-white font-sans">
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
        {/* Navigation Bar */}
        <nav className="w-full bg-yellow-400 shadow">
          <div className="max-w-7xl mx-auto flex items-center px-6 py-2">
            {/* Centered Nav links */}
            <div className="flex-1 flex justify-center">
              <div className="flex gap-8">
                <Link
                  to="/about"
                  className="text-black font-heading font-semibold text-base hover:underline transition"
                >
                  About
                </Link>
                <Link
                  to="/administration"
                  className="text-black font-heading font-semibold text-base hover:underline transition"
                >
                  Administration
                </Link>
                <Link
                  to="/contact"
                  className="text-black font-heading font-semibold text-base hover:underline transition"
                >
                  Contact
                </Link>
                <Link
                  to="/hall-layout"
                  className="text-black font-heading font-semibold text-base hover:underline transition"
                >
                  BSC Hall
                </Link>
            

              </div>
            </div>
            {/* Login button (right) */}
            <Link
              to="/login"
              className="bg-white hover:bg-neutral-100 text-black font-heading font-semibold text-base px-6 py-1 rounded-xl shadow transition ml-8"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Carousel */}
      <section className="relative w-full h-56 md:h-96 bg-white overflow-hidden shadow">
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
              className="w-full h-full object-cover brightness-50"
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
        {/* Banner text */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full z-20 px-6">
          <h2 className="font-heading text-white text-2xl md:text-3xl font-bold drop-shadow">
            Welcome to Begum Sirajunnesa Chowdhury Hall
          </h2>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-4xl mx-auto rounded-2xl shadow bg-white mt-10 px-8 py-8 mb-8">
        <h2 className="font-heading text-2xl font-bold text-black mb-2 text-center">About Us</h2>
        <p className="text-black text-lg font-sans">
          Begum Sirajunnesa Chowdhury Hall is a premier residential hall for female students at SUST.
          Our mission is to ensure a safe, inclusive, and empowering environment where students thrive academically and personally.
          We offer modern facilities, a vibrant community, and dedicated staff focused on your well-being and growth.
        </p>
      </section>

      {/* Provost Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 px-4">
        <div className="flex justify-center md:justify-start">
          <img
            src={PROVOST_PHOTO}
            alt="Provost"
            className="w-50 h-50 object-cover rounded-2xl border-4 border-yellow-200 shadow-lg bg-white"
          />
        </div>
        <div className="md:col-span-2 flex flex-col justify-center">
          <h3 className="font-heading text-xl font-bold text-black mb-1">Provost's Message</h3>
          <p className="text-black text-lg font-sans mb-2">
            "Welcome to Begum Sirajunnesa Chowdhury Hall, a nurturing and empowering environment for female students at SUST.
            Our mission is to provide a safe, supportive, and inspiring space for students to thrive academically and personally.
            We are committed to ensuring your well-being, growth, and success."
          </p>
          <p className="text-yellow-700 font-heading font-semibold mt-2">
            - Prof. Dr. Sabiha Afrin<br />
            Provost, Begum Sirajunnesa Chowdhury Hall
          </p>
        </div>
      </section>

      {/* Notice/Event Buttons (Student Login Removed) */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-6 mb-12 px-4">
        <Link
          to="/notice"
          className="flex-1 text-center bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-bold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 transition"
        >
          Notice Board
        </Link>
        <Link
          to="/events"
          className="flex-1 text-center bg-yellow-300 hover:bg-yellow-200 text-black font-heading font-bold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 transition"
        >
          Upcoming Events
        </Link>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl mb-8 p-8 px-6">
        <h4 className="font-heading text-lg font-bold text-black mb-2">Contact</h4>
        <div className="text-black font-sans text-base mb-2">
          <b>Address:</b> Begum Sirajunnesa Chowdhury Hall,<br />
          Shahjalal University of Science and Technology, Sylhet-3114, Bangladesh
        </div>
        <div className="text-black font-sans text-base mb-2">
          <b>Phone:</b> +880-xxxx-xxxxxx
        </div>
        <div className="text-black font-sans text-base mb-2">
          <b>Email:</b> provost.bsch@sust.edu
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner">
        &copy; {new Date().getFullYear()} Begum Sirajunnesa Chowdhury Hall, SUST.
      </footer>
    </div>
  );
}