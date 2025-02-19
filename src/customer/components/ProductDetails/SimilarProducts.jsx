/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../State/Product/Action';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import Loader from '../loader';

const SimilarProducts = () => {
    const { products } = useSelector(store => store)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findProducts())
    }, [])
    return (
        <div>
            <section className="pt-10">
                <div className="items-center text-center">
                    <h1 className="items-center py-5 text-xl font-bold">Similar Products</h1>
                    <hr className="w-1/2 mx-auto mb-4 border-t-2 border-gray-600 rounded-lg " />
                </div>
                <div className="flex flex-wrap mt-2 mb-4 -mx-2">
                    {products?.products?.content ? (
                        products.products.content.map((item, index) => (
                            <div className="w-full p-2 sm:w-1/2 lg:w-1/4" key={index}>
                                <HomeSectionCard product={item} />
                            </div>
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>
            </section>
        </div>
    )
}

export default SimilarProducts