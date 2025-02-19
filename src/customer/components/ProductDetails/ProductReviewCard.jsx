/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Avatar, Box, Grid, Rating } from '@mui/material'
const ProductReviewCard = ({ reviews }) => {
    const auth = reviews?.user
    return (

        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: "#a521de" }}>{auth?.user?.firstName[0].toUpperCase() || 'k'}</Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div>
                            <p className='text-lg font-semibold'>{auth?.firstName || 'ks'}</p>
                            <p className='opacity-80'>{new Date(reviews?.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <Rating value={reviews.rating} name='half-rating' readOnly precision={.5} />

                    <p>{reviews.review}</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductReviewCard