import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import HomePage from "./components/HomePage";
import TestingPlatform from "./components/TestingPlatform";
import MentalHealthTestingPlatform from "./components/MentalHealthTestingPlatform";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<TestingPlatform />} />
        <Route
          path="/mental-health"
          element={<MentalHealthTestingPlatform />}
        />
        <Route path="/demo" element={<MentalHealthTestingPlatform />} />
        <Route
          path="/docs"
          element={<div className="p-8">Documentation coming soon...</div>}
        />
        <Route
          path="/dashboard"
          element={<div className="p-8">Dashboard coming soon...</div>}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
