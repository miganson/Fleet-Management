import React, { useEffect, useState } from "react";
import {
  getTrips,
  getVehicles,
  getRoutes,
} from "../api";

function VehicleTrips() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [vehicleKilometers, setVehicleKilometers] = useState({}); 

  useEffect(() => {
    Promise.all([getTrips(), getVehicles(), getRoutes()])
      .then(([tripsRes, vehiclesRes, routesRes]) => {
        setTrips(tripsRes.data);
        setVehicles(vehiclesRes.data);
        setRoutes(routesRes.data);

        const kilometers = computeKilometers(tripsRes.data, routesRes.data);
        setVehicleKilometers(kilometers);
      })
      .catch((err) => console.error(err));
  }, []);

  const computeKilometers = (trips, routes) => {
    const routeMap = {}; 
    routes.forEach((route) => {
      routeMap[route.id] = route.route_length;
    });

    const kilometersMap = {}; 
    trips.forEach((trip) => {
      if (trip.is_complete) {
        const vehicleId = trip.vehicle_id._id;
        const routeLength = routeMap[trip.route_id._id] || 0;
        kilometersMap[vehicleId] = (kilometersMap[vehicleId] || 0) + routeLength;
      }
    });

    return kilometersMap;
  };

  return (
    <section>
      <h2>Vehicle Maintenance & Kilometers</h2>
      <table border="1">
        <thead>
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
              ? new Date(vehicle.last_maintenance).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })
              : "No Maintenance Recorded";

            const maintenanceReminder =
              totalKm >= 10000 ? "Maintenance Due" : "Up-to-date";

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
    </section>
  );
}

export default VehicleTrips;
