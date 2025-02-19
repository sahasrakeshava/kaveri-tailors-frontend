import React from 'react';
import { IconButton, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        const data = { data: { quantity: item.quantity + num }, cartItemId: item?._id }
        dispatch(updateCartItem(data))
    }

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item._id));
    };

    return (
        <div className='p-5 border-2 border-purple-700 rounded-md shadow-lg'>
            <div className="flex items-center">
                <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                    <img className='object-cover object-top w-full h-full' src={item.product?.imageUrl} alt="" />
                </div>
                <div className="ml-5 space-y-1">
                    <p className='font-semibold'>{item.product?.title}</p>
                    <p className='opacity-75'>Size: {item.size}, {item.product?.color}</p>
                    <p className='mt-2 opacity-75'>Seller: {item.product?.brand}</p>
                    <div className='flex items-center pt-6 mt-6 space-x-5 text-lg text-gray-900 lg:text-xl'>
                        <p className='font-semibold'>₹{item.discountedPrice}</p>
                        <p className='line-through opacity-60'>₹{item.price}</p>
                        <p className='font-mono text-green-500'>{item.product?.discountedPersent}% off</p>
                    </div>
                </div>
            </div>
            <div className="items-center pt-4 lg:flex lg:space-x-10">
                <div className="flex items-center space-x-2">
                    <IconButton
                        sx={{ color: "#a938cf" }}
                        onClick={() => handleUpdateCartItem(-1)}
                        disabled={item.quantity <= 1}
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className="py-1 border rounded-sm px-7">{item.quantity}</span>
                    <IconButton
                        sx={{ color: "#a938cf" }}
                        onClick={() => handleUpdateCartItem(+1)}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    <Button sx={{ color: "#a938cf" }} onClick={handleRemoveCartItem}>
                        <DeleteIcon />
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
