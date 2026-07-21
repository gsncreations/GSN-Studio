import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AnimationProvider } from "./context/AnimationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AnimationProvider>
    <App />
  </AnimationProvider>
);