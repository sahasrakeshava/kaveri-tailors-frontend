import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import OrderCard from './OrderCard'
import { getAllOrders } from '../../../State/Order/Action'
import OrderError from './OrderError'

const orderStatus = [
    { lable: "Placed", value: "placed" },
    { lable: "Delivered", value: "delivered" },
    { lable: "Cancelled", value: "cancelled" },
    { lable: "Returned", value: "returned" },
]
const Order = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector(store => store)
    const { order } = useSelector(store => store)


    useEffect(() => {
        const userId = auth?.user?._id
        dispatch(getAllOrders(userId))
        console.log("orders:", order?.orders)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth?.user?._id, dispatch])

    const data = order?.orders?.filter(order => order.orderStatus !== "PENDING")
    console.log("order:", data)
    return (
        <>
            {auth?.user?._id ? (<div className='mt-2 ml-2 bg-white border border-purple-600 rounded-md shadow-md px:5 lg:px-5'>
                <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item xs={2.5}>
                        <div className="sticky h-auto p-5 bg-white shadow-lg top-5">
                            <h1 className="text-lg font-bold">Filter</h1>
                            <div className="mt-10 space-y-4">
                                <h1 className='font-semibold'>Order Status</h1>
                                {orderStatus.map((option) => <div className="flex items-center">
                                    <input type="checkbox" defaultValue={option.value} className='w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500' />
                                    <label htmlFor={option.value} className='ml-3 text-sm text-gray-600'>
                                        {option.lable}
                                    </label>
                                </div>)}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="space-y-3">
                            {data?.map((item) => <OrderCard orders={item} />)}
                        </div>
                    </Grid>
                </Grid>
            </div>) : (<OrderError />)}

        </>
    )
}

export default Order