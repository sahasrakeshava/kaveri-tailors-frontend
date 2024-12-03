/* eslint-disable no-unused-vars */
import {
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import icon from './logo.png';
import { Box } from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarvisible, setSideBarVisible] = useState(false);
    const navigate = useNavigate();

    const drawer = (
        <>
            <Box
                sx={{
                    position: "fixed", // Fix the sidebar in place
                    top: 0, // Stick it to the top of the viewport
                    left: 0, // Align it to the left edge of the screen
                    width: "15%", // Adjust the sidebar width as needed
                    height: "100vh", // Full height of the viewport
                    zIndex: 10, // Ensure it's above other content while scrolling
                    backgroundColor: "white", // Sidebar background
                    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Optional shadow effect
                    display: "flex",
                    flexDirection: "column", // Stack sidebar elements vertically
                    overflowY: "auto", // Allows scrolling if content overflows
                }}
            >
                {/* Sidebar Header */}
                <img
                    src={icon}
                    alt="Logo"
                    className="w-[3rem] h-[2.5rem] object-center mt-2 ml-14"
                />

                {/* Sidebar Menu */}
                <List sx={{ marginTop: "5rem" }}>
                    {menu.map((item) => (
                        <ListItem
                            key={item.name}
                            disablePadding
                            onClick={() => navigate(item.path)}
                            sx={{
                                marginBottom: "0.5rem",
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    alignItems: "center",
                                    textAlign: "left",
                                    gap: "1rem",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: "36px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* Account Section */}
                <Box sx={{ marginTop: "auto", padding: "1rem" }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </>
    );

    return (
        <div>
            <div className='flex '>
                <CssBaseline />
                <div className='mr-5  w-[15%] h-full shadow-md border border-r-gray-400'>
                    {drawer}
                </div>
                <div className="w-[85%] z-1">
                    <Routes>
                        <Route path="/" element={<AdminDashboard />}></Route>
                        <Route path="/product/create" element={<CreateProductForm />}></Route>
                        <Route path="/products" element={<ProductTable />}></Route>
                        <Route path="/orders" element={<OrderTable />}></Route>
                        <Route path="/customers" element={<CustomersTable />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;