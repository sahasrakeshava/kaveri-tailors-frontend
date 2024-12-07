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
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults } from "../../../State/search/Action.js"; // Adjust the path if needed
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Loader from "../loader.jsx";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    maxHeight: "80vh",
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
        handleClose()
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <IconButton
                    onClick={handleClose}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <form onSubmit={handleSearch} style={{ display: "flex", marginBottom: "20px", justifyContent: "space-between", marginRight: "30px" }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        sx={{
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "8px",
                            boxShadow: 2,
                            padding: "10px 20px",
                            fontWeight: "bold",
                            backgroundColor: "#8E24AA", // color adjustment
                            "&:hover": {
                                backgroundColor: "#6a1b9a", // darker shade
                            },
                            marginLeft: "10px"
                        }}
                    >
                        Search
                    </Button>
                </form>

                {status === "loading" ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Loader />
                    </div>
                ) : status === "succeeded" && results.length > 0 ? (
                    <List>
                        {results.map((item, index) => (
                            <ListItem
                                key={item.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderBottom: "1px solid #ddd",
                                    padding: "10px 0",
                                }}
                                onClick={() => handleCardClick(item._id)} // Navigate on click
                                style={{ cursor: "pointer" }} // Change cursor on hover to indicate clickable
                            >
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        boxShadow: 3,
                                        backgroundColor: index % 2 === 0 ? "#e0f7fa" : "#fce4ec", // alternating colors
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                >
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
                                    <CardContent
                                        sx={{
                                            flex: 1,
                                            padding: "16px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "#333",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: "#555",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            <strong>Color:</strong> {item.color}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: "#555",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            <strong>Price:</strong> {item.discountedPrice}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                ) : status === "succeeded" && results.length === 0 ? (
                    <Typography align="center" variant="h6" color="textSecondary">No results found</Typography>
                ) : status === "failed" ? (
                    <Typography align="center" variant="h6" color="error">Error: {error}</Typography>
                ) : null}
            </Box>
        </Modal>
    );
};

export default SearchModal;
