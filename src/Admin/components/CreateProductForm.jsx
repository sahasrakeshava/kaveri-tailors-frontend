import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const initialSizes = [
    { name: "S", quantity: 0 },
    { name: "M", quantity: 0 },
    { name: "L", quantity: 0 },
    { name: "XL", quantity: 0 },
];

const CreateProductForm = () => {
    const [productData, setProductData] = useState({
        imageUrl: "",
        brand: "",
        title: "",
        color: "",
        discountedPrice: "",
        price: "",
        discountedPersent: "",
        size: initialSizes,
        quantity: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        description: "",
    });

    const dispatch = useDispatch();

    const handlechange = (e) => {
        const { name, value } = e.target;
        setProductData((prevstate) => ({
            ...prevstate,
            [name]: value,
        }));
    };

    const handleSizeChange = (e, index) => {
        let { name, value } = e.target;
        name = name === "size_quantity" ? "quantity" : name;

        const sizes = [...productData.size];
        sizes[index][name] = value;
        setProductData((prevstate) => ({
            ...prevstate,
            size: sizes,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(productData));
        console.log("Product Creation Data ---", productData);
    };

    return (
        <div className='p-10 m-5 bg-[#d8adf5]' style={{ borderRadius: '10px', padding: '2rem' }}>
            <Typography
                variant='h3'
                sx={{ textAlign: "center", color: '#6A1B9A', marginBottom: '2rem', fontWeight: 'bold' }}
            >
                Add New Product
            </Typography>
            <form onSubmit={handleSubmit} className='min-h-screen'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            name="imageUrl"
                            value={productData.imageUrl}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Brand"
                            name="brand"
                            value={productData.brand}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={productData.title}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={productData.color}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handlechange}
                            type="number"
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={productData.price}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Discount Price"
                            name="discountedPrice"
                            value={productData.discountedPrice}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Discount Percentage"
                            name="discountedPersent"
                            value={productData.discountedPersent}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ marginBottom: '1rem', backgroundColor: '#ffffff', borderRadius: '5px', marginTop: '2rem' }}>
                            <InputLabel>Top Level Category</InputLabel>
                            <Select
                                name="topLevelCategory"
                                value={productData.topLevelCategory}
                                onChange={handlechange}
                            >
                                <MenuItem value="categories">Categories</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Second Level Category"
                            name="secondLevelCategory"
                            value={productData.secondLevelCategory}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Third Level Category"
                            name="thirdLevelCategory"
                            value={productData.thirdLevelCategory}
                            onChange={handlechange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            name="description"
                            rows={3}
                            onChange={handlechange}
                            value={productData.description}
                            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h5" sx={{ marginTop: '2rem', color: '#6A1B9A' }}>
                    Sizes:
                </Typography>
                <div style={{ padding: '1rem 0', marginBottom: '1rem', borderRadius: '8px' }}>
                    {productData.size.map((size, index) => (
                        <Grid container item spacing={3} key={index} sx={{ marginBottom: '1.5rem' }}>
                            <Grid item xs={12} sm={6} sx={{ padding: '0 0.5rem' }}>
                                <TextField
                                    label="Size Name"
                                    name="name"
                                    value={size.name}
                                    onChange={(event) => handleSizeChange(event, index)}
                                    required
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '5px',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '0 0.5rem' }}>
                                <TextField
                                    label="Quantity"
                                    name="size_quantity"
                                    type="number"
                                    onChange={(event) => handleSizeChange(event, index)}
                                    required
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '5px',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </div>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <Button
                        variant="contained"
                        sx={{
                            p: 1.8,
                            backgroundColor: '#6A1B9A',
                            '&:hover': { backgroundColor: '#4A0072' },
                            color: '#ffffff',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                        }}
                        size="large"
                        type="submit"
                    >
                        Add New Product
                    </Button>
                </Grid>
            </form>
        </div>
    );
};

export default CreateProductForm;