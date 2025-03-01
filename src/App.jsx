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
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/Surgery" element={<Surgery />} />
          <Route path="/Reception" element={<Reception />} />
          <Route path="/Settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
