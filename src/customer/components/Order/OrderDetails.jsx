import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Grid, Box } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const OrderDetails = () => {
    return (
        <div className='bg-white ml-4 mr-4 mt-4 mb-4 border space-y-6 border-purple-500 rounded-md p-6'> {/* Added padding here */}
            <div className='shadow-md shadow-gray-300 rounded mb-6 p-4'> {/* Added margin and padding */}
                <h1 className="font-bold text-xl pb-6">Delivery Address:</h1>
                <AddressCard />
            </div>
            <div className='pb-5 pt-2 shadow-md shadow-gray-300 rounded mb-6 p-4'> {/* Added margin and padding */}
                <OrderTracker activeStep={2} />
            </div>
            {[1, 1, 1, 1, 1].map((item, index) => (
                <div key={index} className='mb-6 shadow-md shadow-gray-300 p-4 rounded-md'> {/* Adjusted margins, added padding */}
                    <Grid container className='space-x-5'>
                        <Grid item container className=' rounded-md p-5 border' sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <Grid item xs={6}>
                                <div className='flex items-center space-x-4'>
                                    <img className='w-[5rem] h-[5rem] object-cover object-top rounded-sm' src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/6/t/z/free-sequined-embroidered-saree-granthva-fab-unstitched-original-imaggsq6b4y2adwk.jpeg?q=70" alt="Product" />
                                    <div className='space-y-2 ml-5'>
                                        <p className='font-semibold'>Product Name</p>
                                        <p className='space-x-5 opacity-50 text-xs font-semibold'><span>Product Color</span><span>Product Size</span></p>
                                        <p>seller: Kaveri Tailors</p>
                                        <p>₹1099</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item>
                                <Box sx={{ color: deepPurple[500] }}>
                                    <StarBorderIcon sx={{ fontSize: "2rem" }} className='px-2' />
                                    <span>Rate & Review Product</span>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    )
}

export default OrderDetails
