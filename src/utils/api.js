import axios from "axios";

// Use environment variable (Vite)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important for cookies
});

// ==========================
// REQUEST INTERCEPTOR
// ==========================
api.interceptors.request.use(
  (config) => {
    // You can attach token here later if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// RESPONSE INTERCEPTOR
// ==========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong";

    console.error("API ERROR:", message);

    // Auto logout if unauthorized
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Redirecting...");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;