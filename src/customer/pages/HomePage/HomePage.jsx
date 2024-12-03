import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from '../../../Data/Men/men_kurta'

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="flex flex-col justify-center px-5 py-10 space-y-20 lg:px-10">
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Dresses"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Pants"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shoes"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shoes"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shoes"} />
      </div>
    </div>
  );
};

export default HomePage;
