/* eslint-disable no-sequences */
import React, { useEffect } from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from "../../../State/Product/Action";

const HomePage = () => {
  const { products } = useSelector(store => store)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findProducts())
  }, [dispatch])

  return (
    <div>
      <MainCarousel />
      <div className="flex flex-col justify-center px-5 py-10 space-y-20 lg:px-10">
        <HomeSectionCarousel data={products.products?.content} sectionName={"Popular products"} />
        <HomeSectionCarousel
          data={
            Array.isArray(products.products?.content)
              ? products.products.content.reduce((acc, item) =>
                (String(item?.category?.name) === "sweater" && acc.push(item), acc), []
              )
              : []
          }
          sectionName={"Sweater"}
        />

      </div>
    </div>
  );
};

export default HomePage;