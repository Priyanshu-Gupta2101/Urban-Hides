// Create an Axios instance with custom configuration
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PATH, // Set a base URL for all requests
  // timeout: 5000, // Set a timeout (in milliseconds) for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
