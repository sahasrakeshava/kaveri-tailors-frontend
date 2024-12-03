import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

const Footer = () => {
    return (
        <div >
            <Grid className='mt-10 text-center text-white bg-slate-800'
                container
                sx={{
                    bgcolor: "gray-700", color: "white", py: 5
                }}
            >
                {/* About Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography className='pb-5' variant='h6'>About</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>About</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>Terms & Conditions</Button>
                    </div>

                </Grid>


                {/* Social Media & Newsletter */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography className='pb-5' variant='h6'>Stay Connected</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>Instagram</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>Facebook</Button>
                    </div>
                </Grid>
                {/* Support Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography className='pb-5' variant='h6'>Support</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>Email: support@startup.com</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>WhatsApp: +1 234 567 890</Button>
                    </div>
                </Grid>
            </Grid>
            <Box className='text-center text-white bg-slate-800'>
                <Typography className='pb-1' variant='h6'>© 2024 Kaveri Tailors</Typography>
                <div className='pb-10'>All Rights Reserved.</div>
            </Box>
        </div>
    );
};

export default Footer;
