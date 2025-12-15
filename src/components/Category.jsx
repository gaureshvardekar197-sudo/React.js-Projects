import React from 'react';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';

const Category = () => {
    const { data, loading, error, setCategory } = useData();
    const navigate = useNavigate();

    const getUniqueCategory = (dataArray, property) => {
        if (!dataArray || !Array.isArray(dataArray)) return [];
        return [...new Set(dataArray.map(item => item[property]))];
    };

    const categoryOnlyData = getUniqueCategory(data, "category");

    if (loading || error) return null;

    const handleCategoryClick = (category) => {
        setCategory(category); // set the selected category in context
        navigate('/Products'); // navigate to products page
    };

    return (
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]">
            <div className="max-w-7xl mx-auto">

                {/* Desktop Layout */}
                <div className="hidden md:flex flex-wrap gap-10 items-center justify-center py-8 px-4">
                    {categoryOnlyData.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(item)}
                            className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden py-6 px-4">
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        {categoryOnlyData.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(item)}
                                className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg text-sm"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
