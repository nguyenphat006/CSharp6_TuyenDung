import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://localhost:7152",
  headers: {
    "Content-Type": "application/json",
  },
}); 