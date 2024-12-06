import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Checkout from "../customer/components/Checkout/Checkout";
import Cart from "../customer/components/Cart/Cart";
import Footer from "../customer/components/Footer/Footer";

import OrderDetails from "../customer/components/Order/OrderDetails";
import Order from "../customer/components/Order/Order";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Product from "../customer/components/Product/Product";
import HomePage from "../customer/pages/HomePage/HomePage";
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess';
import Navigation from "../customer/components/Navigation/Navigation";
import ErrorPage from './error'; // Ensure the import name matches the file export

const CustomerRouters = () => {
    return (
        <div>
            <div className='z-10'>
                {/* Render Navigation irrespective of the user's role */}
                <Navigation />
            </div>
            <Routes>
                <Route path='/login' element={<HomePage />} />
                <Route path='/register' element={<HomePage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />} />
                <Route path='/product/:productId' element={<ProductDetails />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/payment/:orderId' element={<PaymentSuccess />} />
                <Route path='/account/order' element={<Order />} />
                <Route path='/account/order/:orderId' element={<OrderDetails />} />

                {/* Catch-all route for any unmatched paths */}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default CustomerRouters;