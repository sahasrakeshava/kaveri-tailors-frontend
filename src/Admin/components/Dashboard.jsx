import React from 'react'
import { Grid } from '@mui/material'
import Acheivement from './Acheivement'
import MonthlyOverview from './MonthlyOverview'
import OrderTableView from '../views/OrderTabeView'
import ProductTable from './ProductTable'

const AdminDashboard = () => {
    return (
        <div className='p-10'>
            <Grid container spacing={2}>
                <Grid className='shadow-lg shadow-gray-600' item xs={12} md={4}>
                    <Acheivement />
                </Grid>
                <Grid item xs={12} md={8} className='shadow-lg shadow-gray-600'>
                    <MonthlyOverview />
                </Grid>
                <Grid className='shadow-lg shadow-gray-600' item xs={12} md={6}>
                    <OrderTableView />
                </Grid>
                <Grid className='shadow-lg shadow-gray-600' item xs={12} md={6}>
                    <ProductTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminDashboard