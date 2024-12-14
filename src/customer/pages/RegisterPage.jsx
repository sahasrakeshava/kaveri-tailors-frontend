import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { getUser, register } from '../../State/Auth/Action';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt, dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
        };
        dispatch(register(userData));
        console.log(userData);
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
            <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="h1" textAlign="center" mb={2}>
                        Create an Account
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='firstName'
                                    name='firstName'
                                    label="First Name"
                                    fullWidth
                                    autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='lastName'
                                    name='lastName'
                                    label="Last Name"
                                    fullWidth
                                    autoComplete='family-name'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id='email'
                                    name='email'
                                    label="E-mail"
                                    type="email"
                                    fullWidth
                                    autoComplete='email'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id='password'
                                    name='password'
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    autoComplete='new-password'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    size='large'
                                    fullWidth
                                    sx={{
                                        padding: "0.8rem",
                                        bgcolor: "#9155FD",
                                        ':hover': { bgcolor: '#7E47E9' }
                                    }}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Box textAlign="center" mt={3}>
                        <Typography variant="body2">
                            Already have an account?
                            <Button
                                onClick={() => navigate("/login")}
                                sx={{ color: '#9155FD', textTransform: 'none', ml: 1 }}
                            >
                                Log In
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegisterPage;
