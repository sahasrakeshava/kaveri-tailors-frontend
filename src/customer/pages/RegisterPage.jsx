import React, { useEffect, useState } from "react";
import {
    useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Grid,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Box,
    Alert,
    CircularProgress,
} from "@mui/material";
import { getUser, register, login, googleLogin } from "../../State/Auth/Action";


const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store);

    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt, dispatch]);

    const validateEmail = (email) => {
        const domain = email.split("@")[1];
        return domain && validDomains.includes(domain);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
        };

        if (!validateEmail(userData.email)) {
            setError("Please use a popular email domain (e.g., gmail.com, yahoo.com).");
            return;
        }

        setError(null);
        setLoading(true);
        dispatch(register(userData));

        // Simulate API response success
        setTimeout(() => {
            setRegistrationStatus(true);
            dispatch(login({ email: userData.email, password: userData.password }));

            // Simulate login and delay for homepage rendering
            setTimeout(() => {
                setLoading(false);
                navigate("/");
            }, 2000);
        }, 1000);
    };

    const handleGoogleRegister = () => {
        // Dispatch Google registration action (to be implemented in Redux)
        dispatch(googleLogin());
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #6A11CB, #2575FC)",
                padding: 2,
            }}
        >
            <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 4, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" textAlign="center" mb={3} color="primary">
                        Create Your Account
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {registrationStatus && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Registration successful! Logging in...
                        </Alert>
                    )}
                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mt: 4,
                            }}
                        >
                            <CircularProgress color="primary" />
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                One moment, please...
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First Name"
                                            placeholder="Enter your first name"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Enter your last name"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="email"
                                            name="email"
                                            label="E-mail"
                                            type="email"
                                            placeholder="e.g., user@gmail.com"
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
                                            placeholder="Enter a strong password"
                                            fullWidth
                                            autoComplete="new-password"
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
                                                ":hover": { bgcolor: "#7E47E9" },
                                            }}
                                        >
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12} textAlign="center">
                                    <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                                        OR
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        startIcon={
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/150px-Google_%22G%22_logo.svg.png"
                                                alt="Google Icon"
                                                style={{ width: "20px", height: "20px" }}
                                            />
                                        }
                                        sx={{
                                            padding: "0.8rem",
                                            borderColor: "#4285F4",
                                            color: "#4285F4",
                                            textTransform: "none", // Matches Google's non-uppercase text style
                                            fontWeight: "bold",   // Adds emphasis
                                            ":hover": {
                                                borderColor: "#3367D6",
                                                color: "#3367D6",
                                            },
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.5rem", // Adds spacing between the icon and text
                                        }}
                                        onClick={handleGoogleRegister}
                                    >
                                        Sign up with Google
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box textAlign="center" mt={3}>
                                <Typography variant="body2">
                                    Already have an account?
                                    <Button
                                        onClick={() => navigate("/login")}
                                        sx={{ color: "#9155FD", textTransform: "none", ml: 1 }}
                                    >
                                        Log In
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

export default RegisterPage;
