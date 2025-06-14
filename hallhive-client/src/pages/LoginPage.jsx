import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SUST_LOGO = "/sust-logo.png";

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    email: "",
    registrationNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setForm({ email: "", registrationNumber: "", password: "" }); // Reset form when role changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const payload =
        role === "student"
          ? { ...form, role }
          : { email: form.email, password: form.password, role }; // admin doesn't use registrationNumber
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate(data.user.role === "admin" ? "/admin" : "/student");
        }, 1200);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white font-sans">
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
          <Link
              to="/"
              className="ml-auto bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold text-base px-8 py-3 rounded-xl shadow transition"
            >
              Home
          </Link>

        </div>
      </header>
      {/* Main Form */}
      <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-yellow-200 px-2 py-12">
        <form
          className="animate-fadeInUp w-full max-w-lg bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-4 border border-yellow-100"
          onSubmit={handleSubmit}
        >
          <h2 className="font-heading text-2xl font-bold text-yellow-700 text-center mb-4">
            Login
          </h2>
          <label className="flex flex-col font-semibold text-black">
            Role
            <select
              value={role}
              onChange={handleRoleChange}
              className="mt-1 border border-yellow-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label className="flex flex-col font-semibold text-black">
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 border border-yellow-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </label>
          {role === "student" && (
            <label className="flex flex-col font-semibold text-black">
              Registration Number
              <input
                name="registrationNumber"
                required
                value={form.registrationNumber}
                onChange={handleChange}
                className="text-white mt-1 border border-yellow-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </label>
          )}
          <label className="flex flex-col font-semibold text-black">
            Password
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              minLength={6}
              className="text-white mt-1 border border-yellow-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-bold text-lg py-2 rounded-xl shadow-lg transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <div
              className={`text-center font-semibold mt-2 ${
                message.startsWith("Login successful")
                  ? "text-green-600"
                  : "text-red-500"
              } animate-fadeInDown`}
            >
              {message}
            </div>
          )}
          <div className="text-center mt-4 text-black">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-yellow-600 hover:underline transition"
            >
              Sign up here
            </Link>
          </div>
        </form>
      </main>
      {/* Footer */}
      <footer className="w-full py-4 bg-yellow-400 text-center text-xs text-black font-sans shadow-inner mt-auto">
        &copy; {new Date().getFullYear()} Begum Sirajunnesa Chowdhury Hall, SUST.
      </footer>
      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97);}
          to { opacity: 1; transform: none; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(.5,1.7,.84,.67);
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fadeInDown { animation: fadeInDown 0.7s cubic-bezier(.5,1.7,.84,.67);}
      `}</style>
    </div>
  );
}
