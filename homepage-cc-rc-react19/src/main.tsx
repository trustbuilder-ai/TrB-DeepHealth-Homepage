import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { initializeResourcePreloading } from "@/utils/resourcePreloading";
import "./styles/globals.css";

// Initialize React 19 resource preloading optimizations
initializeResourcePreloading();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
