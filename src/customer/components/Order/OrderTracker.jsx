import React from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'

const steps = [
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
]
const OrderTracker = ({ activeStep }) => {
    return (
        <div className='w-full'>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => <Step>
                    <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>{label}</StepLabel>
                </Step>)}
            </Stepper>
        </div>
    )
}

export default OrderTracker