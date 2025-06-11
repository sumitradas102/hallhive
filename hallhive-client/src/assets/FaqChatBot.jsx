import React, { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { faqData } from "../data/faqData";

// Configure Fuse.js for fuzzy search
const fuse = new Fuse(faqData, {
  keys: ["question", "variants", "answer"],
  threshold: 0.6,
  includeScore: true,
  ignoreLocation: true,
});

console.log("faqData loaded in FaqChatBot:", faqData);
console.log("First FAQ question:", faqData[0]?.question);

export default function FaqChatBot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm the Hall Assistant. Ask me anything about the hall, admission, complaints, or services.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input.trim() };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
const clean = s => s.toLowerCase().replace(/[^\w\s]/gi, '').trim();
const results = fuse.search(clean(userMsg.text));    


      console.log("User asked:", userMsg.text);
      console.log("Fuse results:", results);
      console.log("Match score:", results[0]?.score);

      let reply;
      // Use the SAME threshold as your Fuse config
      if (results.length > 0 && results[0].score < 0.6) {
        reply = results[0].item.answer;
      } else {
        reply =
          "Sorry, I couldn't find an answer to your question. Please try rephrasing, or contact the hall office.";
      }
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text: reply,
        },
      ]);
      setLoading(false);
    }, 700);
  }

  return (
    <div className="w-full max-w-lg bg-white border-2 border-yellow-300 rounded-2xl shadow-2xl flex flex-col py-6 px-0 md:px-0 animate-fadeInUp">
      <h2 className="text-center font-heading text-2xl font-bold text-black mb-2">
        Hall FAQ Chatbot
      </h2>
      <div className="flex flex-col px-4 md:px-8 py-2 h-[400px] md:h-[480px] overflow-y-auto mb-3 transition-all">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex my-1 ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-xl shadow text-sm
                ${
                  msg.from === "bot"
                    ? "bg-yellow-100 border border-yellow-400 text-black animate-fadeIn"
                    : "bg-red-100 border border-red-400 text-black animate-fadeIn"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-yellow-100 border border-yellow-400 text-black rounded-xl shadow px-4 py-2 text-sm animate-fadeIn">
              <span className="dot-flashing"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form
        className="flex gap-2 border-t border-yellow-200 pt-3 px-4 md:px-8"
        onSubmit={handleSend}
      >
        <input
          type="text"
          className="flex-1 rounded-xl border-2 border-yellow-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-black bg-white"
          placeholder="Type your question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-xl shadow border-2 border-yellow-400 transition"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97);}
          to { opacity: 1; transform: none; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(.5,1.7,.84,.67);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(.42,1.7,.71,.99);}
        .dot-flashing {
          position: relative;
          width: 1em;
          height: 1em;
        }
        .dot-flashing:before, .dot-flashing:after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0; left: 0;
          width: 1em;
          height: 1em;
          border-radius: 50%;
          background: #fde047;
          animation: dotFlashing 1s infinite linear alternate;
        }
        .dot-flashing:after {
          left: 1.2em;
        }
        @keyframes dotFlashing {
          0% { opacity: 1; }
          50%, 100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}