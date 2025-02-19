import React from 'react';
import { motion } from 'framer-motion';
import icon from './empty-cart.png'

const ErrorCart = () => {
    // Animation Variants
    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
    };

    const itemVariant = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, delay: 0.2 },
        },
    };

    const buttonVariant = {
        hover: { scale: 1.1, transition: { yoyo: Infinity, duration: 0.3 } },
    };

    return (
        <motion.div
            style={styles.container}
            variants={containerVariant}
            initial="hidden"
            animate="visible"
        >
            <motion.div style={styles.content} variants={itemVariant}>
                <motion.img
                    src={icon} // Replace with an actual empty cart image URL
                    alt="Empty Cart"
                    style={styles.image}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 120 }}
                />
                <motion.h1 style={styles.heading} variants={itemVariant}>
                    Your Cart is Empty
                </motion.h1>
                <motion.p style={styles.text} variants={itemVariant}>
                    Looks like you haven't added anything to your cart yet.
                </motion.p>
                <motion.button
                    style={styles.button}
                    onClick={() => window.location.href = '/'}
                    variants={buttonVariant}
                    whileHover="hover"
                >
                    Start Shopping
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
    },
    content: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '150px',
        display: 'block', // Centers the image horizontally
        margin: '0 auto 20px', // Centers and adds space below the image
    },
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '10px',
    },
    text: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
};

export default ErrorCart;
