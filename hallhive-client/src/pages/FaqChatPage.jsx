import { Link } from "react-router-dom";
import FaqChatBot from "../assets/FaqChatBot";

const SUST_LOGO = "/sust-logo.png";

export default function FaqChatPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-sans relative">
      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <svg
          className="absolute top-0 left-0 w-full h-64 animate-wave-move opacity-40"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fde047"
            fillOpacity="0.3"
            d="M0,96L80,112C160,128,320,160,480,144C640,128,800,64,960,80C1120,96,1280,192,1360,240L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="w-full bg-gradient-to-r from-yellow-400 via-yellow-600 to-black shadow-lg">
        <div className="max-w-7xl w-full mx-auto flex items-center gap-5 py-4 px-6">
          <img
            src={SUST_LOGO}
            alt="SUST Logo"
            className="w-20 h-20 object-contain bg-white rounded-full border-2 border-yellow-300 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-yellow-300/70"
          />
          <div className="flex flex-col">
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg animate-fadeInDown">
              Begum Sirajunnesa Chowdhury Hall
            </h1>
            <span className="text-[13px] md:text-base text-yellow-100 tracking-wide font-sans leading-tight mt-1 animate-fadeInDown delay-150">
              Shahjalal University of Science and Technology, Sylhet
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full flex flex-col items-center bg-transparent px-2 py-12">
        <div className="w-full flex justify-center animate-fadeInUp">
          <FaqChatBot />
        </div>
        <div className="w-full flex justify-center mt-8 animate-fadeInUp delay-150">
          <Link
            to="/"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold text-base px-8 py-3 rounded-xl shadow-lg border-2 border-yellow-400 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="inline-block"
              viewBox="0 0 24 24"
            >
              <path d="M10 19l-7-7 7-7" />
              <path d="M3 12h18" />
            </svg>
            Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-yellow-400/70 backdrop-blur-[2px] text-center text-xs text-black font-sans shadow-inner mt-auto border-t border-yellow-100">
        &copy; {new Date().getFullYear()} <span className="font-semibold">Begum Sirajunnesa Chowdhury Hall, SUST</span>.
      </footer>
      {/* Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fadeInDown { animation: fadeInDown 0.7s cubic-bezier(.5,1.7,.84,.67);}
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97);}
          to { opacity: 1; transform: none; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.9s cubic-bezier(.5,1.7,.84,.67);
        }
        .delay-150 { animation-delay: 0.15s; }
        @keyframes wave-move {
          from { transform: translateX(0);}
          to { transform: translateX(-60px);}
        }
        .animate-wave-move {
          animation: wave-move 10s linear infinite alternate;
        }
      `}</style>
    </div>
  );
}