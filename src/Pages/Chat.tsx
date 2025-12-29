import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "../CSS/Chat.css";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "m-0",
    sender: "__Myself",
    text: "Hey!",
    timestamp: new Date().toISOString(),
  },
  {
    id: "m-1",
    sender: "Sarah Mitchell",
    text: "Hey! How are you doing today?",
    timestamp: new Date().toISOString(),
  },
  {
    id: "m-2",
    sender: "__Myself",
    text: "I'm doing great, thanks for asking! Just finished that project we discussed.",
    timestamp: new Date().toISOString(),
  },
];

const formatTime = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const generateId = () => `m-${Math.random().toString(36).slice(2, 9)}`;

const Bubble: React.FC<{ message: Message }> = ({ message }) => {
  const isMe = message.sender === "__Myself";
  const initials = isMe
    ? "Me"
    : message.sender
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("");

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[75%] break-words`}>
        <div
          style={{
            borderRadius: !isMe ? "10px 10px 10px 0px" : "10px 10px 0px 10px",
            backgroundColor: isMe ? "oklch(0.97 0.04 159.44)" : "white",
          }}
          className={`p-3 shadow-sm ${
            isMe ? "rounded-lg rounded-br-sm" : "rounded-lg rounded-bl-sm"
          }`}
          aria-label={`${isMe ? "You" : message.sender} said: ${message.text}`}
        >
          <div className="whitespace-pre-wrap">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

const Chat = ({ isInsideMatchcomp }: { isInsideMatchcomp: boolean }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem("chat_messages_v1");
      return raw ? JSON.parse(raw) : initialMessages;
    } catch {
      return initialMessages;
    }
  });
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem("chat_messages_v1", JSON.stringify(messages));
    // auto-scroll to bottom
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newMsg: Message = {
      id: generateId(),
      sender: "__Myself",
      text: trimmed,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setValue("");
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    sendMessage(value);
  };

  return (
    <div
      className={`chatContainer ${
        isInsideMatchcomp ? "isInsideMatchcomp" : ""
      }`}
    >
      <header className="UserchatHeader">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white font-semibold">
            S
          </div>
          <div>
            <h2 className="text-lg font-semibold">Sarah Mitchell</h2>
            <div className="text-sm text-slate-500">Online</div>
          </div>
        </div>
      </header>

      <main
        ref={scrollRef}
        className={`UserChatContent ${
          isInsideMatchcomp ? "isInsideMatchcomp" : ""
        }`}
      >
        {messages.length === 0 ? (
          <div className="text-center text-slate-500">
            No messages yet — start the conversation
          </div>
        ) : (
          messages.map((msg) => <Bubble key={msg.id} message={msg} />)
        )}
      </main>

      <form
        onSubmit={handleSubmit}
        className={`Chatform ${isInsideMatchcomp ? "isInsideMatchcomp" : ""}`}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          aria-label="Type your message"
          placeholder="Type your message"
          className="chatInput"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(value);
            }
          }}
        />

        <button
          type="submit"
          disabled={value.trim().length === 0}
          className={`rounded-full p-2 aspect-square flex items-center justify-center ${
            value.trim().length === 0
              ? "opacity-50 cursor-not-allowed"
              : "shadow-md"
          }`}
          aria-label="Send message"
          style={{ backgroundColor: "#128C7E", color: "white" }}
        >
          <SendIcon sx={{ fontSize: 18 }} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
