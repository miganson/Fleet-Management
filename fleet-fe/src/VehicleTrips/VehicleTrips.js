import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTrips,
  getOrganizations,
  getDriverVehicleAssignments,
} from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const PER_KM_RATE = 10;

function VehicleTrips() {
  const [tripDetails, setTripDetails] = useState([]);

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
    <div className="container mt-4">
      <h1 className="mb-4">Vehicle Trips</h1>
      <Link to="/" className="btn btn-secondary mb-3">
        Return to Dashboard
      </Link>
      <section>
        <h2 className="mb-3">Completed Trips Report</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
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
        </div>
      </section>
    </div>
  );
}

export default VehicleTrips;
