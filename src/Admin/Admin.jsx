import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Navigation from '../customer/components/Navigation/Navigation.jsx';
import AdminDashboard from "./components/Dashboard";
import CreateProductForm from "./components/CreateProductForm";
import ProductTable from "./components/ProductTable";
import OrderTable from "./components/OrderTable";
import CustomersTable from "./components/CustomersTable";

const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <DashboardIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <DashboardIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <DashboardIcon /> },
    { name: "AddProduct", path: "/admin/product/create", icon: <DashboardIcon /> },
];

const Admin = () => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            {/* Navigation Bar - Positioned on top of all other content */}
            <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md">
                <Navigation />
            </div>

            <div className="flex mt-16"> {/* Add mt-16 to offset content below the fixed navigation */}
                <div className="relative w-1/5 h-screen bg-white shadow-md border-r border-gray-300 z-10">
                    {/* Sidebar */}
                    <div className="mt-20">
                        {menu.map((item) => (
                            <div
                                key={item.name}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => navigate(item.path)}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-8">{item.icon}</div>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="flex-1 h-screen bg-gray-100 p-4 overflow-y-auto z-0">
                    {/* Main content */}
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/product/create" element={<CreateProductForm />} />
                        <Route path="/products" element={<ProductTable />} />
                        <Route path="/orders" element={<OrderTable />} />
                        <Route path="/customers" element={<CustomersTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;
