import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVehicles, getTrips, getRoutes } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

function Maintenance() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleKilometers, setVehicleKilometers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesResponse, tripsResponse, routesResponse] =
          await Promise.all([getVehicles(), getTrips(), getRoutes()]);

        setVehicles(vehiclesResponse.data);
        const kilometers = computeKilometers(
          tripsResponse.data,
          routesResponse.data
        );
        setVehicleKilometers(kilometers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const computeKilometers = (trips, routes) => {
    const routeMap = routes.reduce((acc, route) => {
      acc[route._id] = route.route_length;
      return acc;
    }, {});

    return trips.reduce((acc, trip) => {
      if (trip.is_complete) {
        const vehicleId = trip.vehicle_id._id;
        const routeLength = routeMap[trip.route_id._id] || 0;
        acc[vehicleId] = (acc[vehicleId] || 0) + routeLength;
      }
      return acc;
    }, {});
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vehicle Maintenance & Kilometers</h2>
      <Link to="/" className="btn btn-secondary mb-3">
        Return to Dashboard
      </Link>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Vehicle ID</th>
              <th>Plate Number</th>
              <th>Total Kilometers Driven</th>
              <th>Last Maintenance Date</th>
              <th>Maintenance Reminder</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => {
              const totalKm = vehicleKilometers[vehicle._id] || 0;
              const lastMaintenanceDate = vehicle.last_maintenance
                ? new Date(vehicle.last_maintenance).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }
                  )
                : "No Maintenance Recorded";

              const maintenanceReminder =
                totalKm >= 1000 ? "Maintenance Due Over 1,000km" : "Up-to-date";

              return (
                <tr key={vehicle._id}>
                  <td>{vehicle._id}</td>
                  <td>{vehicle.plate_number}</td>
                  <td>{totalKm} km</td>
                  <td>{lastMaintenanceDate}</td>
                  <td>{maintenanceReminder}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Maintenance;
