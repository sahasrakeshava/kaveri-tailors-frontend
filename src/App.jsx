import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import AdminRouters from "./Routers/AdminRouters";
import { useSelector } from "react-redux";
import LoginPage from "./customer/pages/LoginPage";
import RegisterPage from "./customer/pages/RegisterPage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { API_BASE_URL } from "./config/apiConfig";

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

function App() {
  const { auth } = useSelector((store) => store);
  const role = auth?.user?.role; // Extract the role of the user

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check URL for user data and token
    const queryParams = new URLSearchParams(window.location.search);
    const user = queryParams.get("user");
    const token = queryParams.get("token");

    if (user && token) {
      // Step 1: Decode the user data and token from the URL parameters
      const decodedUser = JSON.parse(decodeURIComponent(user));

      // Step 2: Store the decoded user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(decodedUser));
      localStorage.setItem("jwt", token);
    }

    // Step 3: Ping the backend to check server status (optional)
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        // You can dispatch actions here if needed
        console.log("Backend responded:", response.data);
      } catch (error) {
        console.error("Error pinging backend:", error);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    // Display a loading spinner or placeholder while the backend is being pinged
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <GradientCircularProgress />
        <br />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Restrict Admin Routes */}
        {role === "ADMIN" ? (
          <Route path="/admin/*" element={<AdminRouters />} />
        ) : (
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        )}

        {/* Restrict Customer Routes */}
        {role === "CUSTOMER" || !role ? (
          <Route path="/*" element={<CustomerRouters />} />
        ) : (
          <Route path="/*" element={<Navigate to="/admin" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
