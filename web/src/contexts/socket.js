import React, {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useState,
  useCallback,
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

    socket.on("sendContacts", (contacts) => setChats(contacts));
    socket.on("findUserById", (user) => {
      setCurrentUser({ ...user, force: true });
    });
  }, [socket, setCurrentUser, setChats]);

  const findCurrentUser = useCallback(
    ({ id }) => {
      socket.emit("findCurrentUser", id);
    },
    [socket]
  );

  // useEffect(() => {
  //   if (chats.length === 0) {
  //     return;
  //   }

  //   if (!currentUser.id || currentUser.online !== chats[0].online) {
  //     findCurrentUser(chats[0]);
  //   }
  // }, [currentUser]);

  return (
    <SocketContext.Provider
      value={{
        chats,
        currentUser,
        setCurrentUser: findCurrentUser,
        addMessage(message) {
          setCurrentUser({
            ...currentUser,
            messages: [...currentUser.messages, message],
          });
        },
        emit() {
          socket.emit(...arguments);
        },
        on() {
          socket.on(...arguments);
        },
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
