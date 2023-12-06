import { io } from "socket.io-client";
//import { url } from "./authApi";
const url = "https://api.banglamartecommerce.com.bd";
const socket = io(url, {
  autoConnect: true,
  protocols: ["http", "https"],
  withCredentials: true,
  transports: ["websocket"],
});
export default socket;
