import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./pages/Home";

import { SocketProvider } from "./contexts/socket";

export default class App extends Component {
  render() {
    return (
      <>
        <SocketProvider>
          <Home />
          <ToastContainer autoClose={3200} />
        </SocketProvider>
      </>
    );
  }
}
