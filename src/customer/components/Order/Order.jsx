import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import OrderCard from './OrderCard'
import { getAllOrders } from '../../../State/Order/Action'
import OrderError from './OrderError'
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';


const orderStatus = [
    { label: "Placed", value: "PLACED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
]

const Order = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector(store => store)
    const { order } = useSelector(store => store)

    const [selectedStatuses, setSelectedStatuses] = useState([])

    useEffect(() => {
        const userId = auth?.user?._id
        dispatch(getAllOrders(userId))
    }, [auth?.user?._id, dispatch])

    const handleCheckboxChange = (status) => {
        setSelectedStatuses((prevStatuses) => {
            if (prevStatuses.includes(status)) {
                return prevStatuses.filter((item) => item !== status)
            } else {
                return [...prevStatuses, status]
            }
        })
    }

    const filteredData = order?.orders
        ?.filter(order => order.orderStatus !== "PENDING")
        ?.filter(order => selectedStatuses.length === 0 || selectedStatuses.includes(order.orderStatus))

    return (
        <>
            {auth?.user?._id ? (
                <div className='mt-2 ml-2 bg-white border border-purple-600 rounded-md shadow-md px:5 lg:px-5'>
                    <Grid container sx={{ justifyContent: "space-between" }}>
                        <Grid item xs={2.5}>
                            <div className="sticky h-auto p-5 bg-white shadow-lg top-5">
                                <h1 className="text-lg font-bold">Filter</h1>
                                <div className="mt-10 space-y-4">
                                    <h1 className='font-semibold'>Order Status</h1>
                                    {orderStatus.map((option) => (
                                        <div className="flex items-center" key={option.value}>
                                            <input
                                                type="checkbox"
                                                value={option.value}
                                                checked={selectedStatuses.includes(option.value)}
                                                onChange={() => handleCheckboxChange(option.value)}
                                                className='w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500'
                                            />
                                            <label htmlFor={option.value} className='ml-3 text-sm text-gray-600'>
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="space-y-3">
                                {filteredData.length !== 0 ? (filteredData?.map((item) => <OrderCard key={item._id} orders={item} />)) : (

                                    <Box
                                        component={motion.div}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        height="100%"
                                        textAlign="center"
                                        sx={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            padding: '20px',
                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src="https://cdn.dribbble.com/users/721524/screenshots/4112199/media/1f1357e2a1886218a716c24a0d15462b.png?resize=400x300&vertical=center" // Use your image here
                                            alt="No orders"
                                            sx={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'contain',
                                                marginBottom: '20px',
                                            }}
                                        />
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            {'No orders found!'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" mb={2}>
                                            It seems like you don’t have any orders matching the selected filters.
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                                            Refresh
                                        </Button>
                                    </Box>


                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <OrderError />
            )}
        </>
    )
}

export default Order
