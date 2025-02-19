import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
                        <Button className='pb-5' variant='h6' gutterBottom>Terms & Conditions</Button>
                    </div>

                </Grid>


                {/* Social Media & Newsletter */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography className='pb-5' variant='h6'>Stay Connected</Typography>
                    <div>
                        <InstagramIcon />
                        <Button className='pb-5' variant='h6' gutterBottom onClick={() => { window.location.href = 'https://www.instagram.com/kaveritailors/' }}>
                            Instagram</Button>
                    </div>
                    <div>
                        <FacebookIcon />
                        <Button className='pb-5' variant='h6' gutterBottom onClick={() => { window.location.href = 'https://www.facebook.com/profile.php?id=61571771084217' }}>Facebook</Button>
                    </div>
                </Grid>
                {/* Support Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography className='pb-5' variant='h6'>Support</Typography>
                    <div>
                        <EmailIcon />
                        <Button className='pb-5' variant='h6' gutterBottom onClick={() => { window.location.href = 'mailto:kavericomputerworks@gmail.com' }}>Email: kavericomputerworks@gmail.com</Button>
                    </div>
                    <div>
                        <WhatsAppIcon />
                        <Button className='pb-5' variant='h6' gutterBottom>WhatsApp: +91 6302747382 </Button>
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
