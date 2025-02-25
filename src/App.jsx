import { Routes, Route } from "react-router-dom";
import Layout from "./sidebar/Layout";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Reception from "./pages/Reception";
import Settings from "./pages/Settings";
import Surgery from "./pages/Surgery";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />{" "}
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Analytics" element={<Analytics />} />
        <Route path="Appointments" element={<Appointments />} />
        <Route path="Surgery" element={<Surgery />} />
        <Route path="Reception" element={<Reception />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="Logout" element={<h1>Logging Out...</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
