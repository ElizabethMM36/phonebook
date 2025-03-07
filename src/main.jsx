import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <App /> // No <React.StrictMode> wrapper
  );
} else {
  console.error("Root element not found!");
}

