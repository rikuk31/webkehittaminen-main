// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Import App component
import "./index.css"; // Import CSS

const root = createRoot(document.getElementById("root"));
root.render(<App />);
