import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./MainCarouselData";
import { useSpring, animated } from 'react-spring';

const MainCarousel = () => {
  // Directly use the useSpring hook to handle animation
  const animatedProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });

  // Create carousel items with Tailwind CSS classes and lazy loading
  const items = mainCarouselData.map((item) => (
    <img
      key={item.id}  // Ensure each item has a unique key
      className="w-full p-0 ml-0 rounded-lg cursor-pointer"
      role="presentation"
      src={item.image}
      alt=""
      loading="lazy" // Lazy loading attribute for images
    />
  ));

  return (
    <animated.div style={animatedProps} className="flex justify-center px-4 py-6">
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={4000}
        infinite
        disableButtonsControls
      />
    </animated.div>
  );
};

export default MainCarousel;
