import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./pages/Home";

export default class App extends Component {
  render() {
    return (
      <>
        <Home />
        <ToastContainer autoClose={3200} />
      </>
    );
  }
}
