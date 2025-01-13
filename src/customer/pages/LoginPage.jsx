/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "../../State/Auth/Action";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth } = useSelector((state) => state);

    const [loginStatus, setLoginStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        setIsFormSubmitted(true);
        dispatch(login(userData));
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        dispatch(googleLogin());
    };

    useEffect(() => {
        if (isFormSubmitted) {
            if (auth?.jwt?.message === "Login success") {
                setLoginStatus({ success: true, message: "Login successful!" });
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setIsFormSubmitted(false);
                    navigate("/");
                }, 1000);
            } else if (auth?.jwt === null || auth?.jwt?.message !== "Login success") {
                setTimeout(() => {
                    setLoginStatus({
                        success: false,
                        message: "Invalid email or password. Please try again.",
                    });
                    setIsLoading(false);
                }, 3000);
            }
        }
    }, [auth, navigate]);

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
            <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
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
                                <Alert severity={loginStatus.success ? "success" : "error"} sx={{ mb: 2 }}>
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
                                                ":hover": { bgcolor: "#7E47E9" },
                                            }}
                                        >
                                            Log In
                                        </Button>
                                    </Grid>
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
                                            onClick={handleGoogleLogin}
                                        >
                                            Sign in with Google
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Box textAlign="center" mt={3}>
                                <Typography variant="body2">
                                    Don’t have an account?
                                    <Button
                                        onClick={() => navigate("/register")}
                                        sx={{ color: "#9155FD", textTransform: "none", ml: 1 }}
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
