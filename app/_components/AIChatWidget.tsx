"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function AIChatWidget() {
  const [isPro, setIsPro] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkPro = async () => {
      try {
        const res = await axios.get("/api/subscription");
        setIsPro(res.data.isPro);
      } catch {
        setIsPro(false);
      }
    };
    checkPro();
  }, []);

  const WELCOME_MESSAGE = {
    role: "assistant",
    text:
      "Welcome. I am your AI Tutor.\nYou can ask questions about coding, concepts, or your courses.",
  };

  if (!isPro) return null;

  const send = async () => {
    if (!input.trim()) return;

    setMessages((p) => [...p, { role: "user", text: input }]);
    setLoading(true);

    try {
      const res = await axios.post("/api/ai-chat", { message: input });
      setMessages((p) => [
        ...p,
        { role: "assistant", text: res.data.answer },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", text: "Something went wrong." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen((prev) => {
            if (!prev && messages.length === 0) {
              setMessages([WELCOME_MESSAGE]);
            }
            return !prev;
          });
        }}
        className="
          fixed
          bottom-[76px]
          right-4 sm:right-6
          z-50
          bg-yellow-500 text-black
          px-4 py-3 rounded-full
          font-game
          flex items-center gap-2
        "
      >
        <Brain size={18} />
        <span className="whitespace-nowrap">AI Help</span>
      </button>

      {open && (
        <div
          className="
            fixed
            z-50
            bg-black border-4 rounded-2xl p-4
            bottom-[140px]
            right-4 sm:right-6
            w-[calc(100vw-2rem)]
            sm:w-[380px]
            max-h-[420px]
            flex flex-col
          "
        >
          <h2 className="font-game text-lg mb-2">AI Tutor</h2>

          <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl text-sm max-w-[85%] ${
                  m.role === "user"
                    ? "bg-yellow-500 text-black ml-auto"
                    : "bg-zinc-800 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-zinc-900 border p-2 rounded-xl outline-none text-sm"
              placeholder="Ask anything..."
            />
            <Button variant="pixel" onClick={send} disabled={loading}>
              {loading ? "..." : "Send"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
