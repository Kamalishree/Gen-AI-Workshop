import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlannerInput from "./pages/PlannerInput";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<PlannerInput />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </main>
        <footer className="text-center py-6 text-gray-500 text-sm">
          &copy; 2026 AI Smart Nutrition & Meal Planner
        </footer>
      </div>
    </Router>
  );
}

export default App;
