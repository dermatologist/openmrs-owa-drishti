import axios from 'axios';

// To set OpenMRS baseURL from manifest.webapp
const openmrsServer = axios.create({
  // baseURL: "http://localhost:8080",
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default openmrsServer;
