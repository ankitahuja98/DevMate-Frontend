import { io } from "socket.io-client";

export const creasteSocketConnetion = () => {
  if (location.hostname === "localhost") {
    return io(import.meta.env.VITE_API_BASE_URL, {
      path: "/socket.io",
      withCredentials: true,
      transports: ["websocket"],
    });
  } else {
    return io("/", {
      path: "/api/socket.io",
      withCredentials: true,
      transports: ["websocket"],
    });
  }
};
