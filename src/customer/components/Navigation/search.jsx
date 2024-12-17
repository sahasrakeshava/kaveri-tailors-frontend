import React, { useState } from "react";
import {
    Modal,
    Box,
    TextField,
    List,
    ListItem,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Button,
    Fade,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults } from "../../../State/search/Action.js"; // Adjust the path if needed
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Loader from "../loader.jsx";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "800px",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(15px)",
    background: "#d7cade",
    p: 4,
    overflow: "auto",
    maxHeight: "80vh",
};

const inputStyle = {
    borderRadius: "20px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
    },
};

const SearchModal = ({ open, handleClose }) => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { results, status, error } = useSelector((state) => state.search);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(fetchSearchResults(query));
        }
    };

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open}>
                <Box sx={modalStyle}>
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            color: "#555",
                        }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Search Input */}
                    <form
                        onSubmit={handleSearch}
                        style={{
                            display: "flex",
                            marginBottom: "20px",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            placeholder="Search for products..."
                            variant="outlined"
                            fullWidth
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            sx={inputStyle}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: "20px",
                                marginLeft: "10px",
                                padding: "10px 24px",
                                textTransform: "none",
                                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #5a0fb8, #1f60d0)",
                                },
                            }}
                        >
                            Search
                        </Button>
                    </form>

                    {/* Loader */}
                    {status === "loading" && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <Loader />
                        </Box>
                    )}

                    {/* Results */}
                    {status === "succeeded" && results.length > 0 && (
                        <List>
                            {results.map((item) => (
                                <ListItem
                                    key={item.id}
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                        padding: "12px 0",
                                        transition: "all 0.3s ease",
                                        "&:hover": { transform: "scale(1.02)" },
                                    }}
                                    onClick={() => handleCardClick(item._id)}
                                >
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%",
                                            borderRadius: "16px",
                                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                                            overflow: "hidden",
                                            backgroundColor: "#ffffff",
                                        }}
                                    >
                                        {/* Image */}
                                        <CardMedia
                                            component="img"
                                            alt={item.title}
                                            image={item.imageUrl}
                                            sx={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "cover",
                                            }}
                                        />

                                        {/* Content */}
                                        <CardContent
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                padding: "16px",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: "bold", color: "#333" }}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "#777", marginTop: "8px" }}
                                            >
                                                <strong>Color:</strong> {item.color}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "#777", marginTop: "4px" }}
                                            >
                                                <strong>Price:</strong> ₹{item.discountedPrice}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    )}

                    {/* No Results */}
                    {status === "succeeded" && results.length === 0 && (
                        <Typography align="center" variant="h6" color="textSecondary">
                            No results found
                        </Typography>
                    )}

                    {/* Error */}
                    {status === "failed" && (
                        <Typography align="center" variant="h6" color="error">
                            Error: {error}
                        </Typography>
                    )}
                </Box>
            </Fade>
        </Modal>
    );
};

export default SearchModal;
