import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                bgcolor: '#f5f5f5',
                color: '#333',
                padding: 3,
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: '#d32f2f', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
                No Products Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                We couldn't find any products under the Selected Category.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = '/')}
            >
                Go Back to Homepage
            </Button>
        </Box>
    );
};

export default ErrorPage;