import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./sidebar/layout";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Reception from "./pages/Reception";
import Settings from "./pages/Settings";
import Surgery from "./pages/Surgery";

function App() {
  return (
    <Router>
      <div className="flex">
        <Layout />
        <div className="flex-1 p-5">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/appointments" element={<h1>Appointments</h1>} />
            <Route path="/surgery" element={<Surgery />} />
            <Route path="/reception" element={<Reception />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<h1>Logging Out...</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
