/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardHeader } from '@mui/material';
import LoadingBar from '../loader';

const ProductTable = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store);

    console.log('products----', products);

    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId))
    }

    useEffect(() => {
        const data = {
            category: null,
            colors: [],
            sizes: [],
            minPrice: null,
            maxPrice: null,
            minDiscunt: 0,
            sort: '',
            pageNumber: 0,
            pageSize: 1400000000000000,
            stock: '',
        };
        dispatch(findProducts(data));
    }, [products.deletedProduct]);

    return (
        <div className="p-5 text-white">

            <Card className="mt-2 text-center" sx={{ bgcolor: '#242B2E', color: 'white' }}>
                <CardHeader title='All Products' />
                <TableContainer
                    component={Paper}
                    sx={{ bgcolor: '#242B2E', color: 'white' }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }} align="left">Image</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Title</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Id</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Category</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Price</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Discount Percent</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Total Price</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Quantity</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.products?.content?.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell sx={{ color: 'white' }} align="left" scope="row">
                                        <Avatar variant='rounded' src={item.imageUrl} />
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.title}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item._id}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.category.name}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.price}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.discountedPersent}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.discountedPrice}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.quantity}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        <Button sx={{ bgcolor: '#7f11f5', color: 'white' }} onClick={() => handleProductDelete(item._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )) || <LoadingBar />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default ProductTable;
