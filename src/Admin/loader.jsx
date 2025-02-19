import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Sample facts about clothes and clothing brands
const facts = [
    "Levi's jeans are over 150 years old and still going strong.",
    "The first designer sneaker was made by Puma in 1968.",
    "Chanel No. 5 was the first perfume to be marketed with a brand name.",
    "H&M is the second largest global clothing retailer after Inditex (Zara).",
    "The world's largest clothing brand is Nike, with a global market share of 27%.",
    "Jeans were originally made for miners and laborers in the 1800s.",
    "Gucci's logo is based on the initials of its founder, Guccio Gucci.",
    "Fast fashion contributes significantly to water pollution and waste.",
];

const LoadingRing = () => {
    const [fact, setFact] = useState("");

    useEffect(() => {
        // Randomly select a fact every 3 seconds
        const interval = setInterval(() => {
            setFact(facts[Math.floor(Math.random() * facts.length)]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <motion.div
                className="relative flex items-center justify-center border-4 border-pink-500 rounded-full w-20 h-20"
                initial={{ rotate: 0 }}
                animate={{
                    rotate: 360, // Rotates the ring fully
                    borderColor: ["#ec4899", "#00d1d1", "#ec4899"], // Color transition
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3, // Total time for one full cycle
                    ease: "linear", // Smooth continuous rotation
                }}
            >
                {/* Optional center content */}
            </motion.div>
            <Typography className="mt-4 text-center text-lg font-semibold text-gray-700">
                {fact}
            </Typography>
        </Box>
    );
};

export default LoadingRing;
