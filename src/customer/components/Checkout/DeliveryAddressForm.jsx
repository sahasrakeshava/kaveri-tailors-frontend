import React, { useState } from "react";
import { Grid, Button, Box, TextField, Typography } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from 'react-router-dom';
import Loader from "../loader";

const DeliveryAddressForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);
    const [selectedAddress, setSelectedAddress] = useState(null); // Track the selected address
    const [addressError, setAddressError] = useState(''); // Error message for no addresses

    // Handle selecting an address
    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
        setAddressError(''); // Reset the error if a valid address is selected

        const orderData = { address, navigate };
        dispatch(createOrder(orderData));
        console.log("Order created with address:", address);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            setAddressError('No address selected. Please select an address or enter a new one.');
            return;
        }

        const orderData = { address: selectedAddress, navigate };
        dispatch(createOrder(orderData));
        console.log("address", selectedAddress);
    };

    const handleformSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber")
        }
        const orderData = { address, navigate }
        dispatch(createOrder(orderData))
        console.log("address", orderData);
    }

    return (
        <div>
            <Grid container spacing={4}>
                <Grid xs={12} lg={5} className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll">
                    <div className="p-5 border-b cursor-pointer py-7">
                        <div className="space-y-4">
                            {/* Show all linked addresses */}
                            {auth.user?.address.length > 0 ? (
                                auth.user.address.map((item) => (
                                    <div key={item._id} className="p-4 mt-4 border border-gray-700 rounded-md shadow-md">
                                        <AddressCard address={item} />
                                        <Button
                                            sx={{ mt: 1, bgcolor: "RGB(145 85 253)" }}
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleSelectAddress(item).then(handleSubmit)}
                                        >
                                            Select This Address
                                        </Button>
                                    </div>
                                ) || <Loader />)
                            ) : (
                                <Typography color="error" variant="body2">
                                    No addresses linked to your account.
                                </Typography>
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <Box className='p-5 border shadow-md rounded-s-md'>
                        <form onSubmit={handleformSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
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
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete="given-name"
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip/Pin/Postal code"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        sx={{ mt: 2, py: 1.5, bgcolor: "RGB(145 85 253)" }}
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default DeliveryAddressForm;
