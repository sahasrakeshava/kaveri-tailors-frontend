/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
import { Grid, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { deepPurple } from '@mui/material/colors';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';

const OrderDetails = () => {
    const param = useParams();
    const orderId = param.orderId;
    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getOrderById(orderId));
        console.log("response:", order?.order);
    }, [orderId]);

    // Map order statuses to their respective step values
    const step = {
        "PLACED": 1,
        "SHIPPED": 2,
        "DELIVERED": 5
    };

    // Determine the active step based on the order status
    const activeStep = step[order?.order?.orderStatus] || 1; // Default to 2 if no matching status


    return (
        <div className='bg-white ml-4 mr-4 mt-4 mb-4 border space-y-6 border-purple-500 rounded-md p-6'>
            <div className='shadow-md shadow-gray-300 rounded mb-6 p-4'>
                <h1 className="font-bold text-xl pb-6">Delivery Address:</h1>
                <AddressCard address={order?.order?.shippingAddress} />
            </div>
            <div className='pb-5 pt-2 shadow-md shadow-gray-300 rounded mb-6 p-4'>
                <OrderTracker activeStep={activeStep} /> {/* Dynamically set activeStep */}
            </div>
            {order.order?.orderItems.map((item, index) => (
                <div key={index} className='mb-6 shadow-md shadow-gray-300 p-4 rounded-md'>
                    <Grid container className='space-x-5'>
                        <Grid item container className=' rounded-md p-5 border' sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <Grid item xs={6}>
                                <div className='flex items-center space-x-4'>
                                    <img className='w-[5rem] h-[5rem] object-cover object-top rounded-sm' src={item.product.imageUrl} alt="Product" />
                                    <div className='space-y-2 ml-5'>
                                        <p className='font-semibold'>{item.product.title}</p>
                                        <p className='space-x-5 opacity-50 text-xs font-semibold'><span>{item.product.color}</span><span>{item.size}</span></p>
                                        <p>seller: {item.product.brand}</p>
                                        <p>₹{item.product.discountedPrice}</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item>
                                <Box sx={{ color: deepPurple[500] }}>
                                    <StarBorderIcon sx={{ fontSize: "2rem" }} className='px-2' />
                                    <p onClick={() => navigate(`/product/${item.product._id}`)} className='cursor-pointer'>Rate & Review Product</p>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;
