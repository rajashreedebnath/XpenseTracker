import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import React from "react";
import "./App.css"

export default function App() {
  return (
    <div className="App">
      <h1 className="app-title">xTracker</h1>
      <Outlet />
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#FFF",
            color: "#000",
            fontWeight: "600",
          },
        }}
      />
    </div>
  );
}
