import React from "react";
import Slider from "react-slick";
import { useData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from "./Category";

// ✅ Custom Arrows - Hidden on mobile
const NextArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} hidden md:flex`}
            onClick={onClick}
            style={{
                ...style,
                background: "#f53347",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                right: "15px",
                cursor: "pointer"
            }}
        />
    );
};

const PrevArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} hidden md:flex`}
            onClick={onClick}
            style={{
                ...style,
                background: "#f53347",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                left: "15px",
                cursor: "pointer"
            }}
        />
    );
};

// ✅ Array of different background colors
const backgroundColors = [
    "bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]",
    "bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    "bg-gradient-to-r from-[#3a1c71] via-[#d76d77] to-[#ffaf7b]",
    "bg-gradient-to-r from-[#11998e] via-[#38ef7d] to-[#1d976c]",
    "bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#ff416c]",
    "bg-gradient-to-r from-[#654ea3] via-[#da98b4] to-[#fad0c4]",
    "bg-gradient-to-r from-[#1e3c72] via-[#2a5298] to-[#1e3c72]",
    "bg-gradient-to-r from-[#0c0b15] via-[#1c1b3b] to-[#0c0b15]",
];

// ✅ Main Carousel
const Carousel = () => {
    const { data, loading, error } = useData();

    const settings = {
        dotsClass: "slick-dots !bottom-4 md:!bottom-6",
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        speed: 500,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    autoplaySpeed: 3500,
                    speed: 400
                }
            },
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                    dotsClass: "slick-dots !bottom-2",
                    autoplaySpeed: 4000,
                    speed: 300
                }
            }
        ]
    };

    if (loading) {
        return (
            <div className="w-full mt-16 md:mt-0 h-[300px] md:h-[500px] flex items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <div className="text-white text-lg md:text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full mt-16 md:mt-0 h-[300px] md:h-[500px] flex items-center justify-center bg-red-50">
                <div className="text-red-600 text-lg md:text-xl text-center px-4">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden mt-16 md:mt-0">
            <Slider {...settings}>
                {data.slice(0, 7).map((item, index) => {
                    const bgColor = backgroundColors[index % backgroundColors.length];
                    
                    return (
                        <div
                            key={item.id}
                            className="w-full outline-none focus:outline-none"
                        >
                            <div className={`w-full px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10 ${bgColor}`}>
                                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 h-auto min-h-[350px] sm:min-h-[400px] md:h-[500px]">
                                    
                                    {/* DETAILS SECTION - Order changed for mobile */}
                                    <div className="w-full md:w-1/2 lg:w-2/5 space-y-4 sm:space-y-6 order-2 md:order-1">
                                        <h6 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-center md:text-left">
                                            {item.title}
                                        </h6>

                                        <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
                                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300">
                                                ₹ {item.price}
                                            </h2>
                                            {item.originalPrice && (
                                                <span className="text-gray-400 line-through text-lg sm:text-xl">
                                                    ₹ {item.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4 text-center md:text-left px-2 sm:px-0">
                                            {item.description}
                                        </p>

                                        <div className="flex justify-center md:justify-start">
                                            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto max-w-xs">
                                                Shop Now
                                            </button>
                                        </div>
                                    </div>

                                    {/* IMAGE SECTION - Comes first on mobile */}
                                    <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center order-1 md:order-2">
                                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:h-[400px] lg:w-[400px]">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-contain drop-shadow-lg md:drop-shadow-2xl"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
            <Category/>
        </div>
    );
};

export default Carousel;