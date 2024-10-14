import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import VehicleTrips from "./VehicleTrips/VehicleTrips";
import Maintenance from "./Maintenance/Maintenance";
import Report from "./Report/Report";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trips" element={<VehicleTrips />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/Report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
