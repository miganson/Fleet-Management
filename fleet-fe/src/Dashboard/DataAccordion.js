import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DataAccordion({ organizations, routes, vehicles, drivers }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="accordion" id="dataAccordion">
      {/* Organizations Section */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOrganizations">
          <button
            className="accordion-button"
            type="button"
            onClick={() => toggleSection("organizations")}
            aria-expanded={openSection === "organizations"}
          >
            Organizations
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${
            openSection === "organizations" ? "show" : ""
          }`}
          aria-labelledby="headingOrganizations"
          data-bs-parent="#dataAccordion"
        >
          <div className="accordion-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((org) => (
                    <tr key={org._id}>
                      <td>{org._id}</td>
                      <td>{org.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Routes Section */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingRoutes">
          <button
            className="accordion-button"
            type="button"
            onClick={() => toggleSection("routes")}
            aria-expanded={openSection === "routes"}
          >
            Routes
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${
            openSection === "routes" ? "show" : ""
          }`}
          aria-labelledby="headingRoutes"
          data-bs-parent="#dataAccordion"
        >
          <div className="accordion-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Length (km)</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route._id}>
                      <td>{route._id}</td>
                      <td>{route.name}</td>
                      <td>{route.route_length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingVehicles">
          <button
            className="accordion-button"
            type="button"
            onClick={() => toggleSection("vehicles")}
            aria-expanded={openSection === "vehicles"}
          >
            Vehicles
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${
            openSection === "vehicles" ? "show" : ""
          }`}
          aria-labelledby="headingVehicles"
          data-bs-parent="#dataAccordion"
        >
          <div className="accordion-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Plate Number</th>
                    <th>Organization</th>
                    <th>Last Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle._id}>
                      <td>{vehicle._id}</td>
                      <td>{vehicle.plate_number}</td>
                      <td>
                        {vehicle.organization_id
                          ? vehicle.organization_id.name ||
                            vehicle.organization_id._id
                          : "N/A"}
                      </td>
                      <td>
                        {vehicle.last_maintenance
                          ? new Date(vehicle.last_maintenance).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Drivers Section */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingDrivers">
          <button
            className="accordion-button"
            type="button"
            onClick={() => toggleSection("drivers")}
            aria-expanded={openSection === "drivers"}
          >
            Drivers
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${
            openSection === "drivers" ? "show" : ""
          }`}
          aria-labelledby="headingDrivers"
          data-bs-parent="#dataAccordion"
        >
          <div className="accordion-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Organization</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => (
                    <tr key={driver._id}>
                      <td>{driver._id}</td>
                      <td>{driver.name}</td>
                      <td>{driver.organization_id || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataAccordion;
