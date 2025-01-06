import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Typography, Card, CardContent, Box, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../State/Auth/Action';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Access auth state from Redux
    const { auth } = useSelector((state) => state);

    const [loginStatus, setLoginStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track form submission

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        setIsFormSubmitted(true); // Indicate form submission
        dispatch(login(userData));
    };

    useEffect(() => {
        if (isFormSubmitted) {
            if (auth?.jwt?.message === "login success") {
                setLoginStatus({ success: true, message: 'Login successful!' });
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false); // Stop loading
                    setIsFormSubmitted(false); // Reset form submission state
                    navigate("/");
                }, 1000); // Simulate loading delay
            } else if (auth?.jwt === null || auth?.jwt?.message !== "login success") {
                setTimeout(() => {
                    setLoginStatus({ success: false, message: 'Invalid email or password. Please try again.' });
                    setIsLoading(false); // Stop loading
                }, 3000);
            }
        }
    }, [auth, navigate]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #6A11CB, #2575FC)',
                padding: 2,
            }}
        >
            <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="h1" textAlign="center" mb={2}>
                        Welcome Back
                    </Typography>
                    {isLoading ? (
                        <Box textAlign="center" mt={2}>
                            <CircularProgress sx={{ mb: 2 }} />
                            <Typography variant="body1">One moment please...</Typography>
                        </Box>
                    ) : (
                        <>
                            {loginStatus && (
                                <Alert severity={loginStatus.success ? 'success' : 'error'} sx={{ mb: 2 }}>
                                    {loginStatus.message}
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="email"
                                            name="email"
                                            label="E-mail"
                                            type="email"
                                            fullWidth
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            sx={{
                                                padding: "0.8rem",
                                                bgcolor: "#9155FD",
                                                ':hover': { bgcolor: '#7E47E9' },
                                            }}
                                        >
                                            Log In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Box textAlign="center" mt={3}>
                                <Typography variant="body2">
                                    Don’t have an account?
                                    <Button
                                        onClick={() => navigate("/register")}
                                        sx={{ color: '#9155FD', textTransform: 'none', ml: 1 }}
                                    >
                                        Register
                                    </Button>
                                </Typography>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;
