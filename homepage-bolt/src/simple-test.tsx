import { createRoot } from "react-dom/client";

const root = document.getElementById("root");
if (root) {
  console.log("Root element found:", root);
  createRoot(root).render(<h1>Simple Test - Working!</h1>);
} else {
  console.error("Root element not found!");
}
