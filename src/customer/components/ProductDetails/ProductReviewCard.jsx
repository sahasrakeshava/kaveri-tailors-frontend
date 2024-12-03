import React from 'react'
import { Avatar, Box, Grid, Rating } from '@mui/material'
const ProductReviewCard = () => {
    return (
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: "#a521de" }}>KS</Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div>
                            <p className='text-lg font-semibold'>Sahasra</p>
                            <p className='opacity-80'>April 27, 2022</p>
                        </div>
                    </div>
                    <Rating value={4.5} name='half-rating' readOnly precision={.5} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid doloribus consequuntur quod esse modi ipsa id ex impedit excepturi cumque reprehenderit doloremque aliquam iure quos,
                        dolor, molestiae itaque omnis dolore.</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductReviewCard