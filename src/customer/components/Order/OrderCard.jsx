import React from 'react';
import { Grid, Avatar, AvatarGroup } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderCard = ({ orders }) => {
    const navigate = useNavigate();

    // Framer Motion Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.02, boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)' },
    };

    // Get the number of additional items
    const additionalItems = orders?.orderItems?.length > 1 ? orders.orderItems.length - 1 : 0;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/account/order/${orders._id}`)}
            className="rounded-lg overflow-hidden border border-gray-200 bg-white cursor-pointer p-4 shadow-md hover:shadow-lg mt-4 mx-4"
        >
            <Grid container spacing={2} alignItems="center">
                {/* Left Section: Avatar Group */}
                <Grid item xs={3} className="flex ml-2">
                    <AvatarGroup max={3} sx={{ '.MuiAvatar-root': { width: 50, height: 50 } }}>
                        {orders?.orderItems?.map((item, index) => (
                            <Avatar
                                key={item._id || index}
                                src={item?.product?.imageUrl || "https://via.placeholder.com/50"}
                                alt={item?.product?.title || "Product"}
                            />
                        ))}
                    </AvatarGroup>
                </Grid>

                {/* Middle Section: Order Details */}
                <Grid item xs={6}>
                    <div className="space-y-1 -ml-10">
                        <p className="text-sm font-semibold truncate">
                            {orders?.orderItems[0]?.product?.title || "Unknown Product"}{' '}
                            {additionalItems > 0 && `+${additionalItems} more`}
                        </p>
                        <p className="text-xs text-gray-500">
                            Size: {orders?.orderItems[0]?.size || "N/A"} | Qty: {orders?.orderItems[0]?.quantity || 1}
                        </p>
                        <p className="text-sm font-bold text-gray-800">₹{orders?.totalDiscountedPrice}</p>
                    </div>
                </Grid>

                {/* Right Section: Order Status */}
                <Grid item xs={3} className="text-right -ml-10">
                    <div className="space-y-1">
                        {orders.orderStatus === "PLACED" && (
                            <p className="text-xs text-blue-600">
                                <AdjustIcon sx={{ fontSize: 14 }} /> Placed
                            </p>
                        )}
                        {orders.orderStatus === "SHIPPED" && (
                            <p className="text-xs text-orange-600">
                                <AdjustIcon sx={{ fontSize: 14 }} /> Shipped
                            </p>
                        )}
                        {orders.orderStatus === "DELIVERED" && (
                            <p className="text-xs text-green-600">
                                <AdjustIcon sx={{ fontSize: 14 }} /> Delivered
                            </p>
                        )}
                        {orders.orderStatus === "CANCELLED" && (
                            <p className="text-xs text-red-600">
                                <AdjustIcon sx={{ fontSize: 14 }} /> Cancelled
                            </p>
                        )}
                    </div>

                    {/* Expected Delivery */}
                    {orders.orderStatus !== "DELIVERED" && (
                        <p className="text-xs text-gray-500 mt-2">
                            <AdjustIcon sx={{ fontSize: 14 }} /> Expected Delivery By Apr 27
                        </p>
                    )}
                </Grid>
            </Grid>
        </motion.div>
    );
};

export default OrderCard;
