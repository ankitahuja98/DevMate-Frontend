import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "../CSS/Chat.css";
import { creasteSocketConnetion } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/store/store";
import { v4 as uuid } from "uuid";

type ChatMessage = {
  id: string;
  sender: string;
  receiver: string;
  message: string;
};

const Bubble = ({ message, isMe }: { message: ChatMessage; isMe: boolean }) => {
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
          aria-label={`${isMe ? "You" : message.sender} said: ${
            message.message
          }`}
        >
          <div className="whitespace-pre-wrap">{message.message}</div>
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  console.log("messages", messages);

  const userId = useAppSelector(
    (store) => store.profile.userProfile.userProfileData._id
  );

  const socketRef = useRef<any>(null);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    socketRef.current.emit("sendMessage", {
      sender: userId,
      receiver: targetUserId,
      message: input,
    });
    setInput("");
  };

  useEffect(() => {
    if (!userId) return;

    socketRef.current = creasteSocketConnetion();
    socketRef?.current?.emit("joinChat", { userId, targetUserId });

    socketRef.current.on(
      "newMessageReceived",
      ({
        sender,
        receiver,
        message,
      }: {
        sender: string;
        receiver: string;
        message: string;
      }) => {
        console.log("newMessageReceived", message);
        let newMessage = {
          id: uuid(),
          sender,
          receiver,
          message,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    );

    return () => {
      socketRef.current?.off("newMessageReceived");
      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="chatContainer">
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

      <main ref={scrollRef} className="UserChatContent">
        {messages?.length === 0 ? (
          <div className="text-center text-slate-500">
            No messages yet — start the conversation
          </div>
        ) : (
          messages?.map((msg) => (
            <Bubble key={msg.id} message={msg} isMe={msg.sender === userId} />
          ))
        )}
      </main>

      <form onSubmit={handleSubmit} className="Chatform">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          aria-label="Type your message"
          placeholder="Type your message"
          className="chatInput"
        />

        <button
          type="submit"
          disabled={input.trim().length === 0}
          className={`rounded-full p-2 aspect-square flex items-center justify-center ${
            input.trim().length === 0
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
