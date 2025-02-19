/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action'
import { Avatar, AvatarGroup, Button, Card, CardHeader } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const OrderTable = () => {
    const [anchorEl, setAnchorEl] = React.useState([]);
    const open = Boolean(anchorEl);
    const handleClick = (event, index) => {
        const newAnchorElArray = [...anchorEl]
        newAnchorElArray[index] = event.currentTarget
        setAnchorEl(newAnchorElArray);
    };
    const handleClose = (index) => {
        const newAnchorElArray = [...anchorEl]
        newAnchorElArray[index] = null
        setAnchorEl(newAnchorElArray);
    };

    const dispatch = useDispatch()
    const { adminOrder } = useSelector(store => store)

    useEffect(() => {
        dispatch(getOrders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adminOrder.confirmed,
    adminOrder.placed,
    adminOrder.delivered,
    adminOrder.cancelled,
    adminOrder.deletedOrder
    ])

    console.log("admin order--", adminOrder)

    const handleShippedOrder = (orderId) => {
        dispatch(shipOrder(orderId))
        handleClose()
    }
    const handleConfirmedOrder = (orderId) => {
        dispatch(confirmOrder(orderId))
        handleClose()
    }
    const handleDeliveredOrder = (orderId) => {
        dispatch(deliveredOrder(orderId))
        handleClose()
    }
    const handleCancelOrder = (orderId) => {
        dispatch(cancelOrder(orderId))
        handleClose()
    }
    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId))
        handleClose()
    }
    return (
        <div className='p-2'>
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
                                <TableCell sx={{ color: 'white' }} align="left">Id</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Title</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Total Item</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Price</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Discount </TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Total Price</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Status</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Update</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder.orders?.map((item, index) => (
                                <TableRow
                                    key={item.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell sx={{ color: 'white' }} align="left" scope="row">
                                        <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                                            {item.orderItems?.map((orderItem) => <Avatar src={orderItem.product.imageUrl} />)}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item._id}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.orderItems?.map((orderItem) => <p>
                                        {orderItem.product.title}
                                    </p>)}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.totalItem}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.totalPrice}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.discounte}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.totalDiscountedPrice}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left"><span className={` text-white px-5 py-2 rounded-full ${item.orderStatus === "CONFIRMED" ? "bg-[green]" :
                                        item.orderStatus === "SHIPPED" ? "bg-[blue]" :
                                            item.orderStatus === "PLACED" ? "bg-[#8034eb]" :
                                                item.orderStatus === "PENDING" ? "bg-[gray]" :
                                                    item.orderStatus === "DELIVERED" ? "bg-[cyan]" :
                                                        "bg-[red]"}`}>{item.orderStatus}</span>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        <Button
                                            id="basic-button"
                                            aria-haspopup="true"
                                            onClick={(event) => handleClick(event, index)}
                                            aria-controls={`basic-menu-${item._id}`}
                                            aria-expanded={Boolean(anchorEl[index])}
                                        >
                                            {item.orderStatus}
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${item._id}`}
                                            anchorEl={anchorEl[index]}
                                            open={Boolean(anchorEl[index])}
                                            onClose={() => handleClose(index)}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleConfirmedOrder(item._id)}>Confirmed</MenuItem>
                                            <MenuItem onClick={() => handleShippedOrder(item._id)}>Shipped</MenuItem>
                                            <MenuItem onClick={() => handleDeliveredOrder(item._id)}>Delivired</MenuItem>
                                            <MenuItem onClick={() => handleCancelOrder(item._id)}>Cancelled</MenuItem>
                                        </Menu>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        <Button sx={{ bgcolor: '#7f11f5', color: 'white' }} onClick={() => handleDeleteOrder(item._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )) || <p>Loading Please Wait ....</p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default OrderTable