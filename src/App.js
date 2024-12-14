import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import AdminRouters from "./Routers/AdminRouters";
import { useSelector } from "react-redux";
import LoginPage from "./customer/pages/LoginPage";
import RegisterPage from "./customer/pages/RegisterPage";

function App() {
  const { auth } = useSelector((store) => store);
  const role = auth?.user?.role; // Extract the role of the user

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
