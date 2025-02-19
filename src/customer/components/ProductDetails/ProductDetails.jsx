/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Box, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProductReviewCard from './ProductReviewCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import { addItemToCart } from '../../../State/Cart/Action';
import SimilarProducts from './SimilarProducts';
import Loader from '../loader'; // Adjust the path as necessary
import { createReview, fetchReviews } from '../../../State/Review/Action';

const product = {
    name: 'Sahasra',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState("")
    const [newReview, setNewReview] = useState({ review: '', rating: 0 });
    const navigate = useNavigate();
    const params = useParams()
    const dispatch = useDispatch()
    const { products } = useSelector(store => store)
    const { auth } = useSelector(store => store)
    const { reviews } = useSelector(store => store)

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { productId: params.productId, review: newReview.review, rating: newReview.rating, user: auth.user?._id }
        console.log("reviewData", data)
        dispatch(createReview(data))
        setNewReview({ review: '', rating: 0 })
    }



    const handleAddToCart = () => {
        const data = { productId: params.productId, size: selectedSize.name, title: products?.product?.title, user: auth.user?._id }
        dispatch(addItemToCart(data))
        navigate("/cart")
    }

    useEffect(() => {
        const data = { productId: params.productId }
        dispatch(findProductsById(data))
    }, [params.productId])

    useEffect(() => {
        dispatch(fetchReviews(products.product?._id))
        console.log("reviews:", reviews?.reviews)
    }, [dispatch, products.product?._id])


    return (
        <>
            <div className="mt-2 ml-2 mr-2 -mb-5 bg-white border-2 border-purple-500 rounded-md lg:px-20">
                <div className="pt-6">
                    <section className='grid grid-cols-1 pt-10 lg:grid-cols-2 gap-x-8 gap-y-10'>
                        {/* Image gallery */}
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                                <img
                                    alt="product-image"
                                    src={products.product?.imageUrl}
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                            <div className="flex flex-wrap justify-center space-x-5">
                                {product.images.map((item) => <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                                    <img
                                        alt="products-image"
                                        src={item.src}
                                        className="object-cover object-center w-full h-full"
                                    />
                                </div>)}
                            </div>
                        </div>
                        {/* Product info */}
                        <div className="max-w-2xl px-4 pb-6 lg:col-span-1 maxt-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                            <div className="lg:col-span-2">
                                <h1 className="text-lg font-semibold text-gray-900 lg:text-xl">{products.product?.title}</h1>
                                <h1 className='pt-1 text-lg text-gray-900 lg:text-xl opacity-80'>Brand: {products.product?.brand}</h1>
                                <h1 className='pt-1 text-lg text-gray-900 lg:text-xl opacity-80'>Category: {products.product?.category?.name?.replace(/[-/_|:]/g, ' ')}</h1>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>

                                <div className='flex items-center mt-6 space-x-5 text-lg text-gray-900 lg:text-xl'>

                                    <p className='font-semibold'>₹{products.product?.discountedPrice}</p>
                                    <p className='line-through opacity-60'>₹{products.product?.price}</p>
                                    <p className='font-mono text-green-500'>{products.product?.discountedPersent}% off</p>

                                </div>
                                {/* Reviews */}
                                <div className="mt-6">
                                    <div className='flex items-center space-x-3'>
                                        <Rating
                                            name="read-only"
                                            value={reviews?.reviews?.reduce((sum, review) => sum + review.rating, 0) / (reviews?.reviews?.length || 1) || 0}
                                            readOnly
                                        />
                                        <p className='font-medium text-gray-900 hover:text-purple-600'>
                                            {reviews?.reviews?.length || 0} Ratings
                                        </p>
                                        <p className='font-medium text-gray-900 hover:text-purple-600'>|</p>
                                        <p className='font-medium text-purple-600'>
                                            {reviews?.reviews?.length || 0} Reviews
                                        </p>
                                    </div>
                                </div>

                                <form className="mt-10">
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        </div>

                                        <fieldset aria-label="Choose a size" className="mt-4">
                                            <RadioGroup
                                                value={selectedSize}
                                                onChange={setSelectedSize}
                                                className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                            >
                                                {product.sizes.map((size) => (
                                                    <Radio
                                                        key={size.name}
                                                        value={size}
                                                        disabled={!size.inStock}
                                                        className={classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                        )}
                                                    >
                                                        <span>{size.name}</span>
                                                        {size.inStock ? (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                            />
                                                        ) : (
                                                            <span
                                                                aria-hidden="true"
                                                                className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
                                                            >
                                                                <svg
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                                >
                                                                    <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>
                                    </div>
                                    <div className='mt-4'>
                                        {auth.user?._id ? (
                                            <Button
                                                onClick={handleAddToCart}
                                                variant="contained"
                                                sx={{
                                                    px: "2rem",
                                                    py: "1rem",
                                                    bgcolor: "#a521de",
                                                    color: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "0.5rem",
                                                    '&:hover': {
                                                        bgcolor: "#910db6", // Darker purple on hover
                                                    },
                                                }}
                                            >
                                                Add To Cart
                                                <ShoppingCartIcon />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => navigate('/login')}  // Redirect to login page
                                                className="inline-block px-6 py-3 text-lg font-medium text-white transition-all duration-300 bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700"
                                                sx={{
                                                    px: "2rem",
                                                    py: "1rem",
                                                    bgcolor: "#a521de",
                                                    color: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "0.5rem",
                                                    '&:hover': {
                                                        bgcolor: "#910db6", // Darker purple on hover
                                                    },
                                                }}
                                            >
                                                Log in to Add Items
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </div>
                            {/* Description and details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{products.product?.description}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Create Review */}
                    <section className="mt-6 sm:pl-6">
                        <h1 className="pb-4 text-xl font-bold text-gray-800">Add a Review</h1>
                        <div className="p-6 bg-white border rounded-lg shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div>
                                    <label
                                        htmlFor="review"
                                        className="block text-base font-medium text-gray-700"
                                    >
                                        Your Review
                                    </label>
                                    <textarea
                                        id="review"
                                        name="review"
                                        rows="4"
                                        placeholder="Write your thoughts here..."
                                        className="block w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                                        value={newReview.review}
                                        onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                                    ></textarea>
                                </div>
                                <div>
                                    <label
                                        htmlFor="rating"
                                        className="block text-base font-medium text-gray-700"
                                    >
                                        Rate the Product
                                    </label>
                                    <div className="flex items-center mt-2">
                                        <Rating
                                            name="rating"
                                            value={newReview.rating}
                                            onChange={(event, newValue) => {
                                                setNewReview({ ...newReview, rating: newValue });
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                                    >
                                        Submit Review & Rating
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>



                    {/* rating and reviews */}
                    <section className='mt-4 sm:pl-4'>
                        <h1 className='pb-4 text-lg font-semibold'>Recent Reviews & Ratings:</h1>
                        <div className='p-5 border'>
                            <Grid container spacing={7}>
                                <Grid item xs={7}>
                                    {<div className="space-y-5">
                                        {reviews?.reviews?.map((item) => (
                                            <ProductReviewCard reviews={item} /> || <Loader />
                                        ))}
                                    </div>}
                                </Grid>
                                <Grid item xs={5}>
                                    <h1 className='pb-1 text-xl font-semibold'>Product Ratings</h1>
                                    <div className='flex items-center space-x-3'>
                                        <Rating value={4.6} precision={.5} readOnly />
                                        <p className="opacity-60">56,540 Ratings</p>
                                    </div>
                                    <Box className="mt-5">
                                        <Grid container alignItems="center" sx={{ marginBottom: 3 }}> {/* Adding space between rows */}
                                            <Grid item xs={2} sx={{ minWidth: 100 }}>
                                                <p>Excellent</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant="determinate" value={80} color='success' />
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" sx={{ marginBottom: 3 }}> {/* Adding space between rows */}
                                            <Grid item xs={2} sx={{ minWidth: 100 }}>
                                                <p>Very Good</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant="determinate" value={70} color='success' />
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" sx={{ marginBottom: 3 }}> {/* Adding space between rows */}
                                            <Grid item xs={2} sx={{ minWidth: 100 }}>
                                                <p>Good</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant="determinate" value={50} />
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" sx={{ marginBottom: 3 }}> {/* Adding space between rows */}
                                            <Grid item xs={2} sx={{ minWidth: 100 }}>
                                                <p>Average</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant="determinate" value={30} color='warning' />
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" sx={{ marginBottom: 3 }}> {/* Adding space between rows */}
                                            <Grid item xs={2} sx={{ minWidth: 100 }}>
                                                <p>Poor</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant="determinate" value={20} color='error' />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </section>
                    {/* similar Products */}
                    <SimilarProducts />
                </div>
            </div>
        </>
    )
}
