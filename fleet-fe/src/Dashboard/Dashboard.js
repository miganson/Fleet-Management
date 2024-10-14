import React, { useEffect, useState } from "react";
import {
  getTrips,
  getVehicles,
  getDrivers,
  getOrganizations,
  getRoutes,
  getDriverVehicleAssignments,
} from "../api";

import DataAccordion from "./DataAccordion";

const PER_KM_RATE = 10; // Example rate per kilometer

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [driverVehicleAssignments, setDriverVehicleAssignments] = useState([]);
  const [vehicleKilometers, setVehicleKilometers] = useState({});
  const [tripDetails, setTripDetails] = useState([]);

  useEffect(() => {
    Promise.all([
      getTrips(),
      getVehicles(),
      getDrivers(),
      getOrganizations(),
      getRoutes(),
      getDriverVehicleAssignments(),
    ])
      .then(
        ([
          tripsRes,
          vehiclesRes,
          driversRes,
          organizationsRes,
          routesRes,
          driverVehicleRes,
        ]) => {
          setTrips(tripsRes.data);
          setVehicles(vehiclesRes.data);
          setDrivers(driversRes.data);
          setOrganizations(organizationsRes.data);
          setRoutes(routesRes.data);
          setDriverVehicleAssignments(driverVehicleRes.data);

          const kilometers = computeKilometers(tripsRes.data, routesRes.data);
          setVehicleKilometers(kilometers);

          const details = computeTripDetails(
            tripsRes.data,
            driverVehicleRes.data,
            organizationsRes.data
          );
          setTripDetails(details);
        }
      )
      .catch((err) => console.error(err));
  }, []);

  const computeKilometers = (trips, routes) => {
    const routeMap = {};
    routes.forEach((route) => {
      routeMap[route._id] = route.route_length;
    });

    const kilometersMap = {};
    trips.forEach((trip) => {
      if (trip.is_complete) {
        const vehicleId = trip.vehicle_id._id;
        const routeLength = routeMap[trip.route_id._id] || 0;
        kilometersMap[vehicleId] =
          (kilometersMap[vehicleId] || 0) + routeLength;
      }
    });

    return kilometersMap;
  };

  const computeTripDetails = (trips, driverVehicleData, organizations) => {
    return trips
      .filter((trip) => trip.is_complete)
      .map((trip) => {
        const vehicle = trip.vehicle_id;
        const org = organizations.find(
          (o) => o._id === vehicle.organization_id
        );
        const driverAssignment = driverVehicleData.find(
          (d) => d.vehicle_id.plate_number === vehicle.plate_number
        );

        return {
          orgName: org ? org.name : "Unknown Org",
          driverName: driverAssignment
            ? driverAssignment.driver_id.name
            : "No Driver Assigned",
          plateNumber: vehicle.plate_number,
          amount: trip.route_id.route_length * PER_KM_RATE,
        };
      });
  };

  return (
    <div>
      <h1>Dashboard - General View</h1>

      {/* Data Accordion */}
      <DataAccordion
        organizations={organizations}
        routes={routes}
        vehicles={vehicles}
        drivers={drivers}
      />
      {/* Completed Trips Report */}
      <section>
        <h2>Completed Trips Report</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Driver</th>
              <th>Vehicle Plate</th>
              <th>Amount (PHP)</th>
            </tr>
          </thead>
          <tbody>
            {tripDetails.map((detail, index) => (
              <tr key={index}>
                <td>{detail.orgName}</td>
                <td>{detail.driverName}</td>
                <td>{detail.plateNumber}</td>
                <td>{detail.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Vehicle Trips */}
      <section>
        <h2>Vehicle Trips</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Route</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Is Complete</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => {
              const vehicleId = trip.vehicle_id ? trip.vehicle_id._id : null;
              const driverAssignment = driverVehicleAssignments.find(
                (assignment) => assignment.vehicle_id._id === vehicleId
              );
              const driverName = driverAssignment
                ? driverAssignment.driver_id.name
                : "No Driver Assigned";

              return (
                <tr key={trip._id}>
                  <td>{trip._id}</td>
                  <td>
                    {trip.vehicle_id
                      ? trip.vehicle_id.plate_number || trip.vehicle_id._id
                      : "No Vehicle"}
                  </td>
                  <td>{driverName}</td>
                  <td>
                    {trip.route_id
                      ? trip.route_id.name || trip.route_id._id
                      : "No Route"}
                  </td>
                  <td>
                    {new Date(trip.timestamp_start).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }
                    )}
                  </td>
                  <td>
                    {trip.timestamp_end
                      ? new Date(trip.timestamp_end).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          }
                        )
                      : "Ongoing"}
                  </td>
                  <td>{trip.is_complete ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Vehicle Kilometers and Maintenance */}
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
    </div>
  );
}

export default Dashboard;
