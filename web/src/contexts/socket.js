import React, {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useState,
} from "react";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const SocketContext = createContext({});

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => socketIOClient(ENDPOINT), []);
  const [currentUser, setCurrentUser] = useState({});

  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.emit("hello", "Frontend");

    socket.on("sendContacts", (response) => setChats(response));
  }, [socket]);

  useEffect(() => {
    if (
      (!currentUser.id && chats.length) ||
      (chats.length && currentUser.online !== chats[0].online)
    ) {
      setCurrentUser(chats[0]);
    }
  }, [chats, setCurrentUser, currentUser]);

  return (
    <SocketContext.Provider
      value={{
        chats,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within an AuthProvider.");
  }

  return context;
}

export { SocketProvider, useSocket };
