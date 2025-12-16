import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usecart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = usecart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log("Error loading product:", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (!singleProduct) {
    return (
      <div className="text-center py-20 text-xl font-bold text-gray-600">
        Loading Product...
      </div>
    );
  }

  const totalStars = 5;
  const filledStars = Math.round(singleProduct.rating.rate);

  const handleAddToCart = () => {
    // Add product with current quantity from the SingleProduct page
    addToCart({
      ...singleProduct,
      quantity: quantity // Pass the current quantity from SingleProduct
    });
    // Optionally reset quantity after adding to cart
    setQuantity(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-16 mt-20">
      {/* IMAGE */}
      <div className="flex items-center justify-center shadow-xl rounded-xl p-10 border">
        <img
          src={singleProduct.image}
          alt={singleProduct.title}
          className="w-96 h-96 object-contain"
        />
      </div>

      {/* DETAILS */}
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-red-500 font-bold">
          {singleProduct.category}
        </p>

        <h1 className="text-4xl font-bold">{singleProduct.title}</h1>

        {/* RATING */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(totalStars)].map((_, index) => (
              <svg
                key={index}
                viewBox="0 0 24 24"
                fill={index < filledStars ? "#facc15" : "#e5e7eb"}
                className="w-6 h-6"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p>{singleProduct.rating.rate} / 5</p>
          <p className="text-sm text-gray-500">
            ({singleProduct.rating.count} reviews)
          </p>
        </div>

        {/* PRICE */}
        <p className="text-3xl font-bold">₹{singleProduct.price}</p>

        {/* QUANTITY */}
        <div className="flex items-center gap-4">
          <label className="font-medium">Quantity</label>

          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-1 text-xl font-bold bg-gray-100 hover:bg-gray-200"
            >
              −
            </button>

            <span className="px-4 py-1 text-lg font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-1 text-xl font-bold bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600">{singleProduct.description}</p>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="bg-red-500 px-7 py-3 text-white rounded-lg font-semibold hover:bg-red-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;