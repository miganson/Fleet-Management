import React, { useState } from 'react';

function DataAccordion({ organizations, routes, vehicles, drivers }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div>
      {/* Organizations */}
      <div>
        <h2 onClick={() => toggleSection('organizations')} style={{ cursor: 'pointer' }}>
          Organizations
        </h2>
        {openSection === 'organizations' && (
          <div>
            <table border="1">
              <thead>
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
        )}
      </div>

      {/* Routes */}
      <div>
        <h2 onClick={() => toggleSection('routes')} style={{ cursor: 'pointer' }}>
          Routes
        </h2>
        {openSection === 'routes' && (
          <div>
            <table border="1">
              <thead>
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
        )}
      </div>

      {/* Vehicles */}
      <div>
        <h2 onClick={() => toggleSection('vehicles')} style={{ cursor: 'pointer' }}>
          Vehicles
        </h2>
        {openSection === 'vehicles' && (
          <div>
            <table border="1">
              <thead>
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
                        ? vehicle.organization_id.name || vehicle.organization_id._id
                        : 'N/A'}
                    </td>
                    <td>
                      {vehicle.last_maintenance
                        ? new Date(vehicle.last_maintenance).toLocaleString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Drivers */}
      <div>
        <h2 onClick={() => toggleSection('drivers')} style={{ cursor: 'pointer' }}>
          Drivers
        </h2>
        {openSection === 'drivers' && (
          <div>
            <table border="1">
              <thead>
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
                    <td>{driver.organization_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataAccordion;
