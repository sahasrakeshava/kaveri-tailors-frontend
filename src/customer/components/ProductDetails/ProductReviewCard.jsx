/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Avatar, Box, Grid, Rating } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../../State/Auth/Action'
const ProductReviewCard = ({ reviews }) => {
    const { auth } = useSelector(store => store)

    const dispatch = useDispatch()
    useEffect(() => {
        const userId = reviews?.user
        dispatch(getUserById(userId))

    }, [reviews])
    return (

        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: "#a521de" }}>{auth?.user.firstName[0].toUpperCase() || 'ks'}</Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div>
                            <p className='text-lg font-semibold'>{auth?.user?.firstName || 'ks'}</p>
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