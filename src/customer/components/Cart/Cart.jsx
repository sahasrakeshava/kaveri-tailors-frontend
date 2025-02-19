/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../State/Cart/Action';
import ErrorCart from './errorCart';
import Loader from '../loader';

const Cart = () => {
    const navigate = useNavigate();
    const { cart } = useSelector(store => store)
    const { auth } = useSelector(store => store)
    const dispatch = useDispatch()

    const handleCheckout = () => {
        navigate("/checkout?step=2")
    }

    useEffect(() => {
        const userId = auth?.user?._id
        console.log("userId:", userId)
        dispatch(getCart(userId))
    }, [cart.updateCartItem, cart.deleteCartItem])

    return (
        <div className='mx-auto mt-4 ml-2 mr-2 bg-white border-2 border-purple-700 rounded-lg shadow-lg '>
            <h2 className="mt-4 mb-1 text-3xl font-bold text-center text-purple-800">Cart</h2>
            <div className="relative grid grid-cols-1 py-6 lg:grid-cols-3 lg:px-8">
                <div className='flex flex-col col-span-2 space-y-4'>
                    {/* Check if cartItems is empty */}
                    {cart.cart?.cartItems && cart.cart.cartItems.length > 0 ? (
                        cart.cart.cartItems.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ) || <Loader />)
                    ) : (
                        // Render ErrorCart if no items are in the cart
                        <ErrorCart />
                    )}
                </div>

                <div className="px-5 sticky top-0 h-[calc(100vh-2rem)] mt-5 lg:mt-0">
                    <div className="p-6 bg-gray-100 border border-purple-700 rounded-lg shadow-md">
                        <p className="pb-4 font-bold text-purple-700 uppercase">Price Details</p>
                        <hr className="border-gray-300" />

                        <div className="mb-10 space-y-3 font-semibold text-gray-700">
                            <div className="flex justify-between">
                                <span>Price</span>
                                <span>₹{cart.cart?.totalPrice}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-green-600">-₹{cart.cart?.discounte}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="text-green-600">₹0</span>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-purple-800">
                                <span>Total Amount</span>
                                <span>₹{cart.cart?.totalDiscountedPrice}</span>
                            </div>
                        </div>

                        {auth.user?._id ? (<Button
                            onClick={handleCheckout}
                            variant="contained"
                            className="w-full mt-5 transition transform duration-600 hover:scale-105"
                            sx={{
                                px: "2.5rem",
                                py: ".7rem",
                                bgcolor: "#a521de",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                '&:hover': {
                                    bgcolor: "#9b1bd9", // Darken the button on hover
                                }
                            }}
                        >
                            Checkout
                            <ShoppingCartCheckoutIcon className="ml-2" />
                        </Button>) : (<Button
                            onClick={() => navigate("/login")}
                            variant="contained"
                            className="w-full mt-5 transition transform duration-600 hover:scale-105"
                            sx={{
                                px: "2.5rem",
                                py: ".7rem",
                                bgcolor: "#a521de",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                '&:hover': {
                                    bgcolor: "#9b1bd9", // Darken the button on hover
                                }
                            }}
                        >
                            Log In to Continue.
                        </Button>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
