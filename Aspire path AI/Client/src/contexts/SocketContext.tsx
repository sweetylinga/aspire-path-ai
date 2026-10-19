import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useGlobalState } from "./GlobalContext";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  joinContestRoom: (contestId: string) => void;
  leaveContestRoom: (contestId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  joinContestRoom: () => {},
  leaveContestRoom: () => {},
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { state } = useGlobalState();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking if user exists
    const isAuthenticated = !!state.user;

    // Only connect to socket if user is logged in
    if (state.user && isAuthenticated) {
      // ✅ FIXED: Use import.meta.env for Vite, fallback to port 5000
      const SOCKET_URL =
        import.meta.env.VITE_SOCKET_URL || 
        import.meta.env.VITE_API_BASE_URL || 
        import.meta.env.VITE_API_URL || 
        "http://localhost:5000";
      
      console.log("🔌 Connecting to Socket.IO at:", SOCKET_URL);
      
      const socketInstance = io(SOCKET_URL, {
        withCredentials: true,
        // ✅ ADD: Better reconnection settings
        transports: ["websocket", "polling"],
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      socketInstance.on("connect", () => {
        console.log("✅ Socket connected successfully");
        setConnected(true);
      });

      socketInstance.on("disconnect", () => {
        console.log("❌ Socket disconnected");
        setConnected(false);
      });

      socketInstance.on("connect_error", (error) => {
        console.error("🔴 Socket connection error:", error.message);
        setConnected(false);
      });

      socketInstance.on("error", (error) => {
        console.error("🔴 Socket error:", error);
        setConnected(false);
      });

      setSocket(socketInstance);

      // Cleanup function
      return () => {
        console.log("🔌 Disconnecting socket...");
        socketInstance.disconnect();
      };
    }
  }, [state.user]);

  const joinContestRoom = (contestId: string) => {
    if (socket && connected) {
      socket.emit("join-contest", contestId);
      console.log(`✅ Joined contest room: ${contestId}`);
    } else {
      console.warn("⚠️ Cannot join contest room - socket not connected");
    }
  };

  const leaveContestRoom = (contestId: string) => {
    if (socket && connected) {
      socket.emit("leave-contest", contestId);
      console.log(`✅ Left contest room: ${contestId}`);
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, connected, joinContestRoom, leaveContestRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};