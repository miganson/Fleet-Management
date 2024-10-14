import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import {
  getTrips,
  getOrganizations,
  getDriverVehicleAssignments,
} from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const PER_KM_RATE = 10;

function Report() {
  const [tripDetails, setTripDetails] = useState([]);
  const [organizationTotals, setOrganizationTotals] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripsRes = await getTrips();
        const driverVehicleRes = await getDriverVehicleAssignments();
        const organizationsRes = await getOrganizations();

        const details = computeTripDetails(
          tripsRes.data,
          driverVehicleRes.data,
          organizationsRes.data
        );
        setTripDetails(details);
        setOrganizationTotals(computeOrganizationTotals(details));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const computeTripDetails = (trips, driverVehicleData, organizations) => {
    return trips
      .filter((trip) => trip.is_complete)
      .map((trip) => {
        const vehicle = trip.vehicle_id;
        const org = organizations.find(
          (o) => o._id === vehicle.organization_id
        );
        return {
          orgName: org ? org.name : "Unknown Org",
          amount: trip.route_id.route_length * PER_KM_RATE,
        };
      });
  };

  const computeOrganizationTotals = (tripDetails) => {
    return tripDetails.reduce((totals, { orgName, amount }) => {
      totals[orgName] = (totals[orgName] || 0) + amount;
      return totals;
    }, {});
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Report</h1>
      <Link to="/" className="btn btn-secondary mb-3">
        Return to Dashboard
      </Link>
      <section>
        <h2 className="mb-3">Total Amount Owed by Organization</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Organization</th>
                <th>Total Amount Owed (PHP)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(organizationTotals).map(
                ([orgName, totalAmount], index) => (
                  <tr key={index}>
                    <td>{orgName}</td>
                    <td>{totalAmount}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Report;
