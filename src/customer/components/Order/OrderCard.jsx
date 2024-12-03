import React from 'react'
import { Grid } from '@mui/material'
import AdjustIcon from '@mui/icons-material/Adjust'
import { useNavigate } from 'react-router-dom'
const OrderCard = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/account/order/${5}`)} className='mt-2 mb-2 mr-2 shadow-lg hover:shadow-2xl rounded border border-purple-600'>
            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                <Grid item xs={6}>
                    <div className='flex cursor-pointer'>
                        <img className='w-[5rem] h-[5rem] rounded-sm object-cover object-top' src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/6/t/z/free-sequined-embroidered-saree-granthva-fab-unstitched-original-imaggsq6b4y2adwk.jpeg?q=70" alt="" />
                        <div className="ml-5 space-y-2">
                            <p>Product Name</p>
                            <p className='opacity-50 text-xs font-semibold'>Product Size</p>
                            <p className='opacity-50 text-xs font-semibold'>Product Color</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <p>₹1099</p>
                </Grid>
                <Grid item xs={4}>
                    {true && <div><p>
                        <span>
                            <AdjustIcon sx={{ width: "15px", height: "15px" }} className='text-green-600 mr-2 text-sm' />
                            Delivered on March 03
                        </span>
                    </p>
                        <p className='text-xs ml-5'>
                            Your Item Has Been Delivered
                        </p>
                    </div>}
                    {false && <p>
                        <span>
                            Expected Delivery on Mar 03
                        </span>
                    </p>}
                </Grid>
            </Grid>
        </div>
    )
}

export default OrderCard