import React from 'react';
import { Grid, TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../State/Auth/Action';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };
        dispatch(login(userData));
        console.log(userData);
        navigate("/")
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #6A11CB, #2575FC)',
                padding: 2
            }}
        >
            <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="h1" textAlign="center" mb={2}>
                        Welcome Back
                    </Typography>
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
                                        ':hover': { bgcolor: '#7E47E9' }
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
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;
