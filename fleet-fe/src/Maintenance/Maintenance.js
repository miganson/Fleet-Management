import React, { useEffect, useState } from "react";
import { getVehicles } from "../api";

function Maintenance() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicles()
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Maintenance</h1>
      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Last Maintenance</th>
            <th>Total Kilometers</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.plate_number}</td>
              <td>
                {vehicle.last_maintenance
                  ? new Date(vehicle.last_maintenance).toLocaleDateString()
                  : "Not Available"}
              </td>
              <td>{vehicle.route_id.route_length * 10} km</td>{" "}
              {/* Placeholder logic */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Maintenance;
