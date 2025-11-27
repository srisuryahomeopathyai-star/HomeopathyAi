/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

// Register the service worker immediately so the app is installable and
// the SW starts precaching right away in production builds.
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
