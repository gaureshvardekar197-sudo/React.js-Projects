import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { usecart } from "../context/CartContext";

const WishlistPage = () => {
    const navigate = useNavigate();
    const {
        wishlistItems,
        toggleWishlist,
        addToCart,
        cartItem
    } = usecart();

    const handleAddToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
    };

    return (
        <div className="mt-20 max-w-6xl mx-auto mb-10 px-4">
            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-5 space-y-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                        alt="Empty Wishlist"
                        className="w-64 h-64 object-contain"
                    />
                    <h2 className="text-3xl font-bold text-gray-700">Your Wishlist is Empty</h2>
                    <p className="text-gray-500 text-lg text-center max-w-md">
                        Looks like you haven’t added anything to your wishlist yet.
                        Start browsing products to add them here.
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className="font-bold text-3xl sm:text-4xl mb-5 text-center sm:text-left">
                        My Wishlist ({wishlistItems.length})
                    </h1>

                    <div className="mt-6 space-y-6">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between
                   hover:shadow-2xl transition-shadow duration-300"
                            >
                                {/* Product Image */}
                                <div className="flex items-center gap-4 w-full sm:w-2/5">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-contain bg-gray-50 p-2"
                                    />
                                    <div className="flex-1 mt-2 sm:mt-0">
                                        <h1 className="font-semibold text-gray-800 line-clamp-2 text-base sm:text-lg">
                                            {item.title}
                                        </h1>
                                        <p className="text-red-500 font-bold text-lg mt-1">₹{item.price}</p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="flex items-center justify-center w-full sm:w-auto gap-2 bg-red-500 hover:bg-red-600
                       text-white font-semibold px-4 py-3 sm:px-5 sm:py-2 rounded-lg shadow-md
                       transition-transform transform hover:scale-105"
                                    >
                                        <IoCartOutline className="text-white text-lg" />
                                        Add to Cart
                                    </button>

                                    {/* Remove from Wishlist */}
                                    <button
                                        onClick={() => toggleWishlist(item)}
                                        className="flex items-center justify-center w-full sm:w-auto gap-2 bg-gray-200 hover:bg-gray-300
                       text-gray-700 font-semibold px-4 py-3 sm:px-5 sm:py-2 rounded-lg shadow-md
                       transition-transform transform hover:scale-105"
                                    >
                                        <FaRegTrashAlt className="text-gray-700 text-lg" />
                                        Remove
                                    </button>
                                </div>
                            </div>


                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
