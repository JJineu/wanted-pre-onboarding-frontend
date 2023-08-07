import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export default API;
