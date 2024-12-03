import React from 'react'
import { Grid } from '@mui/material'
import OrderCard from './OrderCard'

const orderStatus = [
    { lable: "On The Way", value: "on_the_way" },
    { lable: "Delivered", value: "delivered" },
    { lable: "Cancelled", value: "cancelled" },
    { lable: "Returned", value: "returned" },
]
const Order = () => {
    return (
        <div className='rounded-md border bg-white shadow-md border-purple-600 px:5 lg:px-5 ml-2 mt-2'>
            <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item xs={2.5}>
                    <div className="p-5 h-auto shadow-lg bg-white sticky top-5">
                        <h1 className="font-bold text-lg">Filter</h1>
                        <div className="mt-10 space-y-4">
                            <h1 className='font-semibold'>Order Status</h1>
                            {orderStatus.map((option) => <div className="flex items-center">
                                <input type="checkbox" defaultValue={option.value} className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500' />
                                <label htmlFor={option.value} className='ml-3 text-sm text-gray-600'>
                                    {option.lable}
                                </label>
                            </div>)}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className="space-y-3">
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <OrderCard />)}
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}

export default Order