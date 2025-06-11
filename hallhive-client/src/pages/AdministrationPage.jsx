import { Link } from "react-router-dom";

// Example data, replace with real images and info
const ADMINISTRATORS = [
  {
    role: "Provost",
    name: "Prof. Dr. Sabiha Afrin",
    image: "/provost.jpg",
    occupation: "Professor, Department of Economics",
    phone: "+8801717040166",
    email: "sabiha-eco@sust.edu",
  },
];

const ASSISTANT_PROVOSTS = [
  {
    role: "Assistant Provost",
    name: "Dr. Tajmunnaher",
    image: "/assistant-provost1.jpg",
    occupation: "Associate Professor, Civil Engineering and Environmental Science",
    phone: "+8801919813027",
    email: "Email: moon_cee@yahoo.com",
  },
  {
    role: "Assistant Provost",
    name: "Shimla Akter",
    image: "/c",
    occupation: "Lecturer, Department of Business Administration",
    phone: " +8801714482582",
    email: "shimla-bus@sust.edu",
  },
  {
    role: "Assistant Provost",
    name: "Shimla Akter",
    image: "/assistant-provost3.jpg",
    occupation: "Assistant Professor, Department of ZZZ",
    phone: " +8801714482582",
    email: "shimla-bus@sust.edu",
  },
];

const SUPERVISORS = [
  {
    role: "Supervisor",
    name: "Ms. Fatema Khatun",
    image: "/supervisor1.jpg",
    occupation: "Supervisor",
    phone: "+880-1BBBBBBBBB",
    email: "supervisor1.bsch@sust.edu",
  },
  {
    role: "Supervisor",
    name: "Ms. Roksana Begum",
    image: "/supervisor2.jpg",
    occupation: "Supervisor",
    phone: "+880-1CCCCCCCCC",
    email: "supervisor2.bsch@sust.edu",
  },
];

const SUST_LOGO = "/sust-logo.png";

export default function AdministrationPage() {
  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col">
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

      {/* Administration Page Content */}
      <main className="flex-grow w-full flex flex-col items-center bg-white py-10 px-2">
        <h2 className="font-heading text-2xl font-bold text-black mb-2 text-center tracking-tight">
          Meet the dedicated administration team of
          Begum Sirajunnesa Chowdhury Hall
        </h2>

        {/* Provost */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          {ADMINISTRATORS.map(admin => (
            <div key={admin.name} className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-7 border border-yellow-200 mb-6 hover:shadow-2xl transition duration-200">
              <div className="relative mb-4">
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-yellow-300 shadow bg-white"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-xs font-bold text-black shadow-sm border border-yellow-300">
                  {admin.role}
                </div>
              </div>
              <div className="text-center mt-2 flex flex-col gap-1">
                <div className="font-heading text-xl font-bold text-black">
                  {admin.name}
                </div>
                <div className="text-yellow-700 font-semibold text-sm mb-2">
                  {admin.occupation}
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-700 font-sans">
                  <div>
                    <span className="font-semibold">Phone: </span>
                    <a href={`tel:${admin.phone}`} className="hover:underline">{admin.phone}</a>
                  </div>
                  <div>
                    <span className="font-semibold">Email: </span>
                    <a href={`mailto:${admin.email}`} className="hover:underline break-all">{admin.email}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assistant Provosts */}
        <h3 className="font-heading text-2xl font-bold text-yellow-700 mb-4 text-center">Assistant Provosts</h3>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {ASSISTANT_PROVOSTS.map(admin => (
            <div key={admin.name} className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-7 border border-yellow-200 hover:shadow-2xl transition duration-200">
              <div className="relative mb-4">
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-28 h-28 object-cover rounded-full border-4 border-yellow-300 shadow bg-white"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-yellow-300 text-xs font-bold text-black shadow-sm border border-yellow-200">
                  {admin.role}
                </div>
              </div>
              <div className="text-center mt-2 flex flex-col gap-1">
                <div className="font-heading text-lg font-bold text-black">
                  {admin.name}
                </div>
                <div className="text-yellow-700 font-semibold text-sm mb-2">
                  {admin.occupation}
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-700 font-sans">
                  <div>
                    <span className="font-semibold">Phone: </span>
                    <a href={`tel:${admin.phone}`} className="hover:underline">{admin.phone}</a>
                  </div>
                  <div>
                    <span className="font-semibold">Email: </span>
                    <a href={`mailto:${admin.email}`} className="hover:underline break-all">{admin.email}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supervisors */}
        <h3 className="font-heading text-2xl font-bold text-yellow-700 mb-4 text-center">Supervisors</h3>
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUPERVISORS.map(admin => (
            <div key={admin.name} className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-7 border border-yellow-200 hover:shadow-2xl transition duration-200">
              <div className="relative mb-4">
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-24 h-24 object-cover rounded-full border-4 border-yellow-300 shadow bg-white"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-yellow-200 text-xs font-bold text-black shadow-sm border border-yellow-100">
                  {admin.role}
                </div>
              </div>
              <div className="text-center mt-2 flex flex-col gap-1">
                <div className="font-heading text-base font-bold text-black">
                  {admin.name}
                </div>
                <div className="text-yellow-700 font-semibold text-xs mb-2">
                  {admin.occupation}
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-700 font-sans">
                  <div>
                    <span className="font-semibold">Phone: </span>
                    <a href={`tel:${admin.phone}`} className="hover:underline">{admin.phone}</a>
                  </div>
                  <div>
                    <span className="font-semibold">Email: </span>
                    <a href={`mailto:${admin.email}`} className="hover:underline break-all">{admin.email}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Home Button */}
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
      <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner mt-auto">
        &copy; {new Date().getFullYear()} Begum Sirajunnesa Chowdhury Hall, SUST.
      </footer>
    </div>
  );
}