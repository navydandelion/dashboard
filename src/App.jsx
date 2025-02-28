import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./sidebar/layout";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Reception from "./pages/Reception";
import Settings from "./pages/Settings";
import Surgery from "./pages/Surgery";
import Appointments from "./pages/Appointments";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ui/context/theme";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    setIsAuthenticated(!!storedUser);
  }, []);

  return (
    <ThemeProvider>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Surgery />}
        />

        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Appointments" element={<Appointments />} />
            <Route path="/Surgery" element={<Surgery />} />
            <Route path="/Reception" element={<Reception />} />
            <Route path="/Settings" element={<Settings />} />
            <Route
              path="/logout"
              element={<Logout setIsAuthenticated={setIsAuthenticated} />}
            />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

function Logout({ setIsAuthenticated }) {
  useEffect(() => {
    localStorage.removeItem("loggedInUser");
    localStorage.setItem("rememberMe", "false");
    setIsAuthenticated(false);
    window.location.href = "/login";
  }, [setIsAuthenticated]);

  return <h1>Logging Out...</h1>;
}

export default App;
