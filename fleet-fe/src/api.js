import axios from "axios";

const API_URL = "http://localhost:5000/api"; // BE connection

export const getTrips = async () => await axios.get(`${API_URL}/vehicle-trips`);
export const getVehicles = async () => await axios.get(`${API_URL}/vehicles`);
export const getDrivers = async () => await axios.get(`${API_URL}/drivers`);
export const getOrganizations = async () => await axios.get(`${API_URL}/organizations`);
export const getRoutes = async () => await axios.get(`${API_URL}/routes`);
export const getDriverVehicleAssignments = () =>
    axios.get(`${API_URL}/driver-vehicle`);

