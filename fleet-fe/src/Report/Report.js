import React, { useEffect, useState } from "react";
import { getOrganizations, getTrips } from "../api";

function MonthlyReport() {
  const [organizations, setOrganizations] = useState([]);
  const [trips, setTrips] = useState([]);
  const PER_KM_RATE = 5; 

  useEffect(() => {
    getOrganizations().then((res) => setOrganizations(res.data));
    getTrips().then((res) => setTrips(res.data));
  }, []);

  const computePayment = (organizationId) => {
    const orgTrips = trips.filter(
      (trip) => trip.vehicle_id.organization_id === organizationId && trip.is_complete
    );

    return orgTrips.reduce(
      (total, trip) => total + trip.route_id.route_length * PER_KM_RATE,
      0
    );
  };

  return (
    <div>
      <h1>Monthly Report</h1>
      <table>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Total Payment</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org._id}>
              <td>{org.name}</td>
              <td>₱{computePayment(org._id).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyReport;
