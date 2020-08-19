import React, { createContext, useEffect, useContext, useMemo } from "react";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const SocketContext = createContext({});

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => socketIOClient(ENDPOINT), []);

  useEffect(() => {
    console.log(socket);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        mostra: () => console.log("Oba"),
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
