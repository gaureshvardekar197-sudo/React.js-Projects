import React from "react";
import { IoCartOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { usecart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // ✅ get wishlist + cart from context
  const { addToCart, toggleWishlist, isWishlisted } = usecart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div
      className="
        relative border border-gray-200 rounded-2xl bg-white cursor-pointer
        hover:shadow-xl hover:scale-[1.03] transition-all duration-300
        p-3 sm:p-4 flex flex-col
      "
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* ❤️ Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`
          absolute top-3 right-3 z-10 p-2 rounded-full shadow transition
          ${
            isWishlisted(product.id)
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600"
          }
          hover:scale-110
        `}
      >
        {isWishlisted(product.id) ? (
          <IoHeart className="w-5 h-5" />
        ) : (
          <IoHeartOutline className="w-5 h-5" />
        )}
      </button>

      {/* Product Image */}
      <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-3/4 h-3/4 object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="line-clamp-2 font-semibold text-gray-900 mt-3 h-12 text-sm sm:text-base">
        {product.title}
      </h1>

      {/* Price */}
      <p className="text-lg sm:text-xl text-gray-800 font-bold mt-2">
        ₹{product.price}
      </p>

      {/* 🛒 Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="
          bg-red-500 mt-4 px-3 py-2 sm:px-4 sm:py-2.5
          text-base sm:text-lg rounded-lg text-white 
          w-full flex gap-2 items-center justify-center font-semibold
          hover:bg-red-600
        "
      >
        <IoCartOutline className="w-5 h-5 sm:w-6 sm:h-6" />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
