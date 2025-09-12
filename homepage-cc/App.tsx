import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import HomePage from "./components/HomePage";
import MentalHealthTestingPlatform from "./components/MentalHealthTestingPlatform";
import { Documentation } from "./pages/Documentation";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/mental-health"
          element={<MentalHealthTestingPlatform />}
        />
        <Route path="/demo" element={<MentalHealthTestingPlatform />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
