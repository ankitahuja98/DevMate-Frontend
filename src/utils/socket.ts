import io from "socket.io-client";

export const creasteSocketConnetion = () => {
  return io(import.meta.env.VITE_API_BASE_URL);
};
