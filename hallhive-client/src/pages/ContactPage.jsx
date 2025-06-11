import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#032041] font-sans flex flex-col">
      {/* Header */}
      <header className="w-full bg-black shadow">
        <div className="w-full max-w-7xl mx-auto flex items-center gap-4 py-4 px-6">
          <img
            src="/sust-logo.png"
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

      {/* Main Contact Section */}
      <main className="flex-1 w-full py-12 px-2 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#032041] py-12 rounded-2xl shadow-lg">
          {/* Contact Info */}
          <section className="md:col-span-1 flex flex-col px-8">
            <h2 className="text-white font-heading text-xl font-bold mb-4 mt-2">Contact</h2>
            <div className="text-white font-sans text-base mb-2 leading-relaxed">
              Begum Sirajunnesa Chowdhury Hall<br />
              Shahjalal University Campus, Sylhet-3114, Bangladesh
            </div>
            <div className="flex items-center text-white mt-3 mb-1 gap-2">
              <FaEnvelope className="inline-block text-yellow-400" />
              <span className="break-all">provost.bsch@sust.edu</span>
            </div>
            <div className="flex items-center text-white mb-5 gap-2">
              <FaPhoneAlt className="inline-block text-yellow-400" />
              <span>
                +88 09666 911 463 (Ext 4450 <span className="text-yellow-200">(Provost)</span>, 4452 <span className="text-yellow-200">(Office)</span>)
              </span>
            </div>
            <div className="mt-6">
              <div className="text-white font-heading font-semibold text-base mb-2">Follow Us On</div>
              <div className="flex gap-4 items-center text-yellow-400 text-2xl">
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </section>

          {/* Other Links */}
          <section className="md:col-span-1 flex flex-col px-8">
            <h2 className="text-white font-heading text-xl font-bold mb-4 mt-2">Other Links</h2>
            <ul className="text-white font-sans text-base flex flex-col gap-4">
              <li>
                <span className="text-yellow-400 mr-2">{">"}</span>
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li>
                <span className="text-yellow-400 mr-2">{">"}</span>
                <a href="#" className="hover:underline">Webmail</a>
              </li>
              <li>
                <span className="text-yellow-400 mr-2">{">"}</span>
                <a href="#" className="hover:underline">Blog</a>
              </li>
              <li>
                <span className="text-yellow-400 mr-2">{">"}</span>
                <a href="#" className="hover:underline">Forum</a>
              </li>
              <li>
                <span className="text-yellow-400 mr-2">{">"}</span>
                <a href="#" className="hover:underline">Website</a>
              </li>
            </ul>
          </section>

          {/* Map */}
          <section className="md:col-span-1 flex flex-col px-8">
            <h2 className="text-white font-heading text-xl font-bold mb-4 mt-2">Find us on Map</h2>
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-lg shadow-inner">
              {/* Real Google Map embed */}
              <iframe
                title="Begum Sirajunnesa Chowdhury Hall Map"
                src="https://www.google.com/maps?q=Begum+Sirajunnesa+Chowdhury+Hall,+SUST,+Sylhet,+Bangladesh&output=embed"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        </div>

        {/* Home Button at the End */}
        <div className="w-full flex justify-center mt-12">
          <Link
            to="/"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold text-base px-8 py-3 rounded-xl shadow transition"
          >
            Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner">
        &copy; {new Date().getFullYear()} Begum Sirajunnesa Chowdhury Hall, SUST.
      </footer>
    </div>
  );
}