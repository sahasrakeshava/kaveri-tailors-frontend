import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderError = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
                {/* ERROR Icon */}
                <div className="mb-4 justify-center items-center flex">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdGDTSn-tQ770_sj8bhToEW5snTlj-luo8w&s' alt='error-image' />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>

                {/* Message */}
                <p className="mb-6">You need to login to view the orders.</p>

                {/* Login Button */}
                <Link to="/login">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Login
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default OrderError;
