import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getVehicles, getDrivers, getOrganizations, getRoutes } from "../api";
import DataAccordion from "./DataAccordion";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, driversRes, organizationsRes, routesRes] =
          await Promise.all([
            getVehicles(),
            getDrivers(),
            getOrganizations(),
            getRoutes(),
          ]);
        setVehicles(vehiclesRes.data);
        setDrivers(driversRes.data);
        setOrganizations(organizationsRes.data);
        setRoutes(routesRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard - General View</h1>
      <div className="mb-3">
        <Link to="/maintenance" className="btn btn-primary me-2">
          Vehicle Maintenance
        </Link>
        <Link to="/trips" className="btn btn-secondary me-2">
          Completed Trips Report
        </Link>
        <Link to="/report" className="btn btn-success">
          Total Amount Owed Report
        </Link>
      </div>
      <DataAccordion
        organizations={organizations}
        routes={routes}
        vehicles={vehicles}
        drivers={drivers}
      />
    </div>
  );
}

export default Dashboard;
