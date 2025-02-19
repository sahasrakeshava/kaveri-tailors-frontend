import React, { useState, useEffect, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";


const HomeSectionCarousel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4); // Default for large screens
  const carouselRef = useRef(null); // Reference for the carousel

  const items = data?.slice(0, 16).map((item) => (
    <HomeSectionCard product={item} />
  ));

  // Responsive settings
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  // Detect how many items are visible based on screen width
  const updateVisibleItems = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      setVisibleItems(4);
    } else if (screenWidth >= 568) {
      setVisibleItems(2);
    } else {
      setVisibleItems(1);
    }
  };

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);

  const slidePrev = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.slideTo(newIndex);
    }
  };

  const slideNext = () => {
    const newIndex = Math.min(activeIndex + 1, items.length - visibleItems);
    setActiveIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.slideTo(newIndex);
    }
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  return (
    <div
      className="border-2 border-gray-700"
      style={{
        padding: "20px", // Add padding to the carousel container
        backgroundColor: "#f9f9f9", // Light background for better contrast
        margin: "20px", // Symmetrical margin for aesthetics
        borderRadius: "5px", // Rounded corners for a polished look
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}
    >
      <h2 className="py-5 text-2xl font-extrabold text-center text-gray-800 underline ">{sectionName}</h2>
      <div className="relative">
        <AliceCarousel
          items={items}
          infinite
          className="mr-10"
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          containerClass="carousel-container"
          ref={carouselRef} // Reference to carousel
        />

        {/* Previous Button */}

        {activeIndex !== 0 && <Button
          variant="contained"
          onClick={slidePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: "-70px", // Bring the button closer to the left margin
            transform: "translateY(-50%)",
            bgcolor: "white",
            color: "black",
            minWidth: "40px", // Rectangular shape
            minHeight: "30px", // Taller button
            borderRadius: "5px", // Slight rounding
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
            padding: "5px", // Padding inside the button
            "&:hover": {
              bgcolor: "gray", // Darker hover effect
            },
          }}
          aria-label="previous"
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: "24px" }} />
        </Button>}

        {/* Next Button */}
        {activeIndex < items?.length - visibleItems && (
          <Button
            variant="contained"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "-70px", // Bring the button closer to the right margin
              transform: "translateY(-50%)",
              bgcolor: "white",
              color: "black",
              minWidth: "40px", // Rectangular shape
              minHeight: "30px", // Taller button
              borderRadius: "5px", // Slight rounding
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
              padding: "5px", // Padding inside the button
              "&:hover": {
                bgcolor: "gray", // Darker hover effect
              },
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ fontSize: "24px", transform: "rotate(180deg)" }} // Rotated for the Next button
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
