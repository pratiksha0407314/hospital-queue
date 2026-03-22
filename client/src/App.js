import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/Patients";
import Doctor from "./pages/Doctors";
import LiveQueue from "./pages/LiveQueue";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Notification from "./pages/Notifications";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/patient" element={<Patient />} />

        <Route path="/doctor" element={<Doctor />} />

        <Route path="/queue" element={<LiveQueue />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/help" element={<Help />} />

        <Route path="/notification" element={<Notification />} />

      </Routes>

    </Router>
  );
}

export default App;