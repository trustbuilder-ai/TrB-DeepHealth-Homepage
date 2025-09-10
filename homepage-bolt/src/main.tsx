import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext";
// import TestApp from './TestApp.tsx'

console.log("Main.tsx is loading...");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (!rootElement) {
  console.error("Root element not found!");
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StrictMode>,
    );
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error rendering app:", error);
  }
}
