import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import AdminRouters from "./Routers/AdminRouters";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./customer/pages/LoginPage";
import RegisterPage from "./customer/pages/RegisterPage";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularWithValueLabel from "./MainLoading.jsx"
function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const role = auth?.user?.role; // Extract the role of the user

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ping the backend when the app loads
    const fetchData = async () => {
      try {
        const response = await axios.get("https://kaveri-tailors-backend.onrender.com"); // Adjust the URL to your backend endpoint
        // You can dispatch actions here if needed
        console.log("Backend responded:", response.data);
      } catch (error) {
        console.error("Error pinging backend:", error);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Display a loading spinner or placeholder while the backend is being pinged
    return <div className="loading">Loading...</div>;
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
