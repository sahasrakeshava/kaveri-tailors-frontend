import React from 'react';
import { motion } from 'framer-motion';
import ErrorIcon from '@mui/icons-material/Error'; // Importing MUI error icon

const ErrorPage = () => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="text-red-600 text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ErrorIcon fontSize="inherit" /> {/* Adjust icon size if needed */}
            </motion.div>
            <motion.h1
                className="text-4xl font-bold text-gray-800"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Oops! Page Not Found
            </motion.h1>
            <motion.p
                className="text-lg text-gray-600 mt-2"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Looks like we don't have this page right now.
            </motion.p>
            <motion.a
                href="/"
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                Go Back to Home
            </motion.a>
        </motion.div>
    );
};

export default ErrorPage;
