import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { FiFilter, FiX, FiSliders, FiChevronUp } from "react-icons/fi";

const FilterSection = () => {
  const {
    data,
    category,
    setCategory,
    priceRange,
    setPriceRange,
  } = useData();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [...new Set(data.map((item) => item.category))];
  const maxPrice = Math.max(...data.map(item => item.price), 1000);

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(value);
    
    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[0] = newPriceRange[1];
    }
    if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[1] = newPriceRange[0];
    }
    
    setPriceRange(newPriceRange);
  };

  const resetFilters = () => {
    setCategory("all");
    setPriceRange([0, maxPrice]);
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  return (
    <>
      {/* Filter Button - Always visible */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="
          fixed bottom-6 right-6
          lg:hidden
          z-40
          bg-blue-600 text-white
          p-3 rounded-full
          shadow-lg
          flex items-center gap-2
          hover:bg-blue-700
          active:bg-blue-800
          transition-all duration-200
          animate-pulse
        "
        aria-label="Open filters"
      >
        <FiSliders size={20} />
        <span className="font-medium">Filters</span>
      </button>

      {/* Desktop Filter Section */}
      <div
        className="
          hidden
          lg:block
          w-60 
          bg-white 
          border rounded-lg shadow-sm
          p-6
          sticky top-10
          h-fit
          mt-12
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={resetFilters}
            className="
              text-sm text-blue-600 hover:text-blue-800 
              font-medium px-2 py-1
              hover:bg-blue-50 rounded
              transition-colors
            "
          >
            Reset
          </button>
        </div>

        {/* CATEGORY */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium
                transition-colors
                ${category === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium
                  transition-colors
                  ${category === cat 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE RANGE */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
          
          {/* Price Display */}
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
            <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
          </div>

          {/* Range Slider */}
          <div className="relative h-10 mb-6">
            {/* Track */}
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-300 rounded -translate-y-1/2" />
            
            {/* Active Track */}
            <div 
              className="absolute top-1/2 h-1.5 bg-blue-600 rounded -translate-y-1/2"
              style={{
                left: `${(priceRange[0] / maxPrice) * 100}%`,
                right: `${100 - (priceRange[1] / maxPrice) * 100}%`
              }}
            />
            
            {/* Min Thumb */}
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="
                absolute top-1/2 -translate-y-1/2
                w-full h-2
                appearance-none
                bg-transparent
                pointer-events-none
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-blue-600
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:shadow
                [&::-webkit-slider-thumb]:border
                [&::-webkit-slider-thumb]:border-white
              "
            />
            
            {/* Max Thumb */}
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="
                absolute top-1/2 -translate-y-1/2
                w-full h-2
                appearance-none
                bg-transparent
                pointer-events-none
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-blue-600
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:shadow
                [&::-webkit-slider-thumb]:border
                [&::-webkit-slider-thumb]:border-white
              "
            />
          </div>
        </div>
      </div>

      {/* Mobile Slide-up Filter Panel */}
      <div
        className={`
          lg:hidden
          fixed inset-0
          z-50
          transition-all duration-300 ease-in-out
          ${isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black
            transition-opacity duration-300
            ${isFilterOpen ? "bg-opacity-50" : "bg-opacity-0"}
          `}
          onClick={() => setIsFilterOpen(false)}
        />

        {/* Filter Panel - Bottom to Top */}
        <div
          className={`
            absolute bottom-0 left-0 right-0
            bg-white
            rounded-t-3xl
            shadow-2xl
            transform transition-transform duration-300 ease-in-out
            ${isFilterOpen ? "translate-y-0" : "translate-y-full"}
            flex flex-col
            max-h-[85vh]
          `}
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <FiFilter className="text-blue-600" size={20} />
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="
                p-2 rounded-full hover:bg-gray-100
                transition-colors
              "
              aria-label="Close filters"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* CATEGORY */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategory("all")}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium
                    transition-colors
                    ${category === "all" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-medium
                      transition-colors
                      ${category === cat 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
              
              {/* Price Display */}
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
              </div>

              {/* Range Slider */}
              <div className="relative h-10 mb-6">
                {/* Track */}
                <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-300 rounded -translate-y-1/2" />
                
                {/* Active Track */}
                <div 
                  className="absolute top-1/2 h-1.5 bg-blue-600 rounded -translate-y-1/2"
                  style={{
                    left: `${(priceRange[0] / maxPrice) * 100}%`,
                    right: `${100 - (priceRange[1] / maxPrice) * 100}%`
                  }}
                />
                
                {/* Min Thumb */}
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="
                    absolute top-1/2 -translate-y-1/2
                    w-full h-2
                    appearance-none
                    bg-transparent
                    pointer-events-none
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-blue-600
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:shadow
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-white
                  "
                />
                
                {/* Max Thumb */}
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="
                    absolute top-1/2 -translate-y-1/2
                    w-full h-2
                    appearance-none
                    bg-transparent
                    pointer-events-none
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-blue-600
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:shadow
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-white
                  "
                />
              </div>
            </div>
          </div>

          {/* Footer with Action Buttons */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={resetFilters}
                className="
                  flex-1 py-3
                  border border-gray-300
                  rounded-xl
                  font-medium text-gray-700
                  hover:bg-gray-100
                  active:bg-gray-200
                  transition-colors
                "
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="
                  flex-1 py-3
                  bg-blue-600 text-white
                  rounded-xl
                  font-medium
                  hover:bg-blue-700
                  active:bg-blue-800
                  transition-colors
                "
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;