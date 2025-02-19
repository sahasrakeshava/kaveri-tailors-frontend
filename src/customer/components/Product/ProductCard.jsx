import React from 'react';
import { motion } from 'framer-motion';
import "./ProductCard.css";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            className='productCard w-[17rem] m-3 cursor-pointer rounded-lg p-[3.5px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-400 hover:to-cyan-500 duration-200 shadow-2xl'
            whileTap={{ scale: 0.95 }} // Slightly shrink when clicked
        >
            <div onClick={() => navigate(`/product/${product?._id}`)} className='relative bg-white rounded-lg'>
                {/* Discount Sticker */}
                {product.discountPersent && (
                    <div className="absolute top-0 right-0 px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-bl-lg z-1">
                        {product.discountPersent}% OFF
                    </div>
                )}

                <div className='h-[20rem] flex justify-center items-center'>
                    <img
                        className='object-contain h-full mt-3 rounded-lg' // Changed object-cover to object-contain
                        src={product.imageUrl}
                        alt={product.title}
                    />
                </div>

                <div className='p-3 bg-white rounded-sm textPart'>
                    <div>
                        <p className='font-bold text-black opacity-80'>{product.title}</p>
                        <p className='font-semibold text-gray-600'>{product.brand}</p>
                    </div>
                    <div className='flex items-center space-x-2 rounded-sm'>
                        <p className='font-semibold'>₹{product.discountedPrice}</p>
                        <p className='line-through opacity-50'>{product.price}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
