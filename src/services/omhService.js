import axios from 'axios';

var patientResourceObj;
var patientId;
var loginWindow;
const omhServer = axios.create({
  baseURL: process.env.omhOnFhirRedirectUri,
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
});
