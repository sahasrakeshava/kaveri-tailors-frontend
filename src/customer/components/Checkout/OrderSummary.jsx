/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem';
import { Button } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { createPayment } from '../../../State/Payment/Action';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const { order } = useSelector(store => store)
    const searchParams = new URLSearchParams(location.search)
    const orderId = searchParams.get("order_id")

    const handleCheckout = () => {
        dispatch(createPayment(orderId))
    }
    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [orderId])
    return (
        <div>
            <div className="p-5 border border-purple-600 shadow-lg rounded-s-md">
                {order?.order?.shippingAddress ? (
                    <AddressCard address={order.order?.shippingAddress} />
                ) : (
                    <p>Loading address...</p>
                )}
            </div>
            <div className='mx-auto mt-4 ml-2 mr-2 rounded-lg '>
                <div className="relative grid grid-cols-1 py-6 lg:grid-cols-3 lg:px-8">
                    <div className="flex flex-col col-span-2 space-y-4">
                        {order.order?.orderItems.map((item) => (
                            <CartItem item={item} />
                        ))}
                    </div>
                    <div className="px-5 sticky top-0 h-[calc(100vh-2rem)] mt-5 lg:mt-0">
                        <div className="p-6 bg-gray-100 border border-purple-700 rounded-lg shadow-md">
                            <p className="pb-4 font-bold text-purple-700 uppercase">Price Details</p>
                            <hr className="border-gray-300" />

                            <div className="mb-10 space-y-3 font-semibold text-gray-700">
                                <div className="flex justify-between">
                                    <span>Price</span>
                                    <span>₹{order.order?.totalPrice}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-600">-₹{order.order?.discounte}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="text-green-600">₹0</span>
                                </div>

                                <div className="flex justify-between text-lg font-bold text-purple-800">
                                    <span>Total Amount</span>
                                    <span>₹{order.order?.totalDiscountedPrice}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleCheckout}
                                variant="contained"
                                className="w-full mt-5 transition transform duration-600 hover:scale-105"
                                sx={{
                                    px: "2.5rem",
                                    py: ".7rem",
                                    bgcolor: "#a521de",
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                    '&:hover': {
                                        bgcolor: "#9b1bd9", // Darken the button on hover
                                    }
                                }}
                            >
                                <CurrencyRupeeIcon className="mr-2" />
                                Payment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary