/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alert, AlertTitle, Grid } from '@mui/material'
import { getOrderById } from '../../../State/Order/Action'
import { updatePayment } from '../../../State/Payment/Action'
import OrderTracker from '../Order/OrderTracker'
import AddressCard from '../AddressCard/AddressCard'

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState(null)
    const { orderId } = useParams()

    const dispatch = useDispatch();
    const order = useSelector(state => state.order); // Access the order state from Redux
    const { order: orderData, loading, error } = order;

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search)
        setPaymentId(urlParam.get("razorpay_payment_id"))
        setPaymentStatus(urlParam.get("razorpay_payment_link_status"))
    }, [])

    useEffect(() => {
        if (paymentId) {
            const data = { orderId, paymentId }
            dispatch(getOrderById(orderId))
            dispatch(updatePayment(data))
        }
    }, [orderId, paymentId, dispatch])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Handle case where the order data is not available yet
    if (!orderData || !orderData.orderItems) {
        return <div>No order items available.</div>;
    }

    return (
        <div className='px-2 mt-2 mb-2 ml-2 mr-2 border-2 border-purple-600 rounded-md lg:px-36'>
            <div className='flex flex-col items-center justify-center'>
                <Alert
                    variant='filled'
                    severity='success'
                    sx={{ mb: 6, mt: 6, width: "fit-content" }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    Congratulations! Your order has been placed.
                </Alert>
            </div>
            <OrderTracker activeStep={1} />
            <Grid container className='py-5 pt-20 space-y-5'>
                {orderData.orderItems.map((item) => (
                    <Grid container item
                        className='p-5 rounded-md shadow-xl'
                        sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                        <Grid item xs={6}>
                            <div className='flex items-center'>
                                <img className='w-[5rem] h-[5rem] object-cover object-top' src={item.product.imageUrl} alt="" />
                                <div className="ml-5 space-y-2">
                                    <p>{item.product.title}</p>
                                    <div className="space-x-5 text-xs font-semibold opacity-50">
                                        <span>Color: {item.product.color}</span>
                                        <span>size: {item.size}</span>
                                    </div>
                                    <p>seller: {item.product.brand}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>₹{item.discountedPrice}</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <AddressCard address={orderData.shippingAddress} />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default PaymentSuccess;