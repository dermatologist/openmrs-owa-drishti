import axios from 'axios';


const omhServer = axios.create({
  baseURL: process.env.omhOnFhirRedirectUri,
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
});
