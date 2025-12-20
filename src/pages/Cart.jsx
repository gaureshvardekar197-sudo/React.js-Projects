import React, { useState } from "react";
import { usecart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Add this import

const Cart = () => {
  const { cartItem, deleteItem, increaseQuantity, decreaseQuantity, clearCart } = usecart();
  const navigate = useNavigate();

  // Add delivery form state
  const [deliveryForm, setDeliveryForm] = useState({
    fullName: "",
    address: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  });

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setDeliveryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", deliveryForm);
    toast.success("Delivery information saved!");
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!deliveryForm.fullName || !deliveryForm.address || !deliveryForm.phone) {
      toast.error("Please fill in all required delivery information");
      return;
    }

    // Create order
    const order = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItem,
      deliveryInfo: deliveryForm,
      totalItems: cartItem.reduce((total, item) => total + item.quantity, 0),
      subtotal: cartItem.reduce((total, item) => total + item.price * item.quantity, 0),
      deliveryCharge: 0,
      handlingCharge: 10,
      grandTotal: cartItem.reduce((total, item) => total + item.price * item.quantity, 0) + 10
    };

    // Save order to localStorage
    const previousOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    previousOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(previousOrders));

    // Clear cart
    clearCart();

    toast.success(`Order placed successfully! Order ID: ${order.orderId}`);
    navigate("/");
  };

  // Total price calculation
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-20 max-w-6xl mx-auto mb-10 px-4">

      {cartItem.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-64 h-64 object-contain"
          />
          <h2 className="text-3xl font-bold text-gray-700">Your Cart is Empty</h2>
          <p className="text-gray-500 text-lg text-center max-w-md">
            Looks like you haven't added anything to your cart yet.
            Start shopping to see items here.
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
          <h1 className="font-bold text-3xl mb-5">My Cart ({cartItem.length})</h1>

          <div className="mt-6 space-y-6">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="flex items-center gap-4 w-full md:w-2/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-lg object-contain bg-gray-50 p-2"
                  />
                  <div className="flex-1">
                    <h1 className="font-semibold text-gray-800 line-clamp-2 text-base md:text-lg">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-bold text-lg mt-1">₹{item.price}</p>
                  </div>
                </div>

                {/* Quantity + Total Price */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded text-gray-700 font-medium bg-gray-50">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 font-bold transition"
                  >
                    +
                  </button>
                  <p className="ml-6 font-bold text-lg text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="flex items-center gap-2 mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <FaRegTrashAlt className="text-white text-lg" />
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Delivery & Billing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 space-y-4">
              <h1 className="text-gray-800 font-bold text-xl mb-2">Delivery Info</h1>
              <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col space-y-2">
                  <label>Full name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={deliveryForm.fullName}
                    onChange={handleFormChange}
                    placeholder="Enter your name" 
                    className="p-2 rounded-md w-full" 
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label>Address *</label>
                  <input 
                    type="text" 
                    name="address"
                    value={deliveryForm.address}
                    onChange={handleFormChange}
                    placeholder="Enter your Address" 
                    className="p-2 rounded-md w-full" 
                    required
                  />
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-col space-y-2 w-full">
                    <label>State *</label>
                    <input 
                      type="text" 
                      name="state"
                      value={deliveryForm.state}
                      onChange={handleFormChange}
                      placeholder="Enter your State" 
                      className="p-2 rounded-md w-full" 
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label>PinCode *</label>
                    <input 
                      type="text" 
                      name="pincode"
                      value={deliveryForm.pincode}
                      onChange={handleFormChange}
                      placeholder="Enter your Pincode" 
                      className="p-2 rounded-md w-full" 
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-col space-y-2 w-full">
                    <label>Country</label>
                    <input 
                      type="text" 
                      name="country"
                      value={deliveryForm.country}
                      onChange={handleFormChange}
                      placeholder="Enter your Country" 
                      className="p-2 rounded-md w-full" 
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label>Phone No *</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={deliveryForm.phone}
                      onChange={handleFormChange}
                      placeholder="Enter your Phone Number" 
                      className="p-2 rounded-md w-full" 
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-red-500 text-white px-3 py-2 rounded-md mt-3 w-full cursor-pointer hover:bg-red-600 transition"
                >
                  Save Delivery Info
                </button>
              </form>
            </div>

            {/* Billing Info */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 space-y-4">
              <h1 className="text-gray-800 font-bold text-xl mb-2">Bill Details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <LuNotebookText /> Items Total
                </h1>
                <p>₹{totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining /> Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">₹20</span> FREE
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag /> Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">₹10</p>
              </div>
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand Total</h1>
                <p className="font-semibold text-lg">₹{totalPrice + 10}</p>
              </div>
              <button 
                onClick={handleCheckout} 
                className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-8 hover:bg-red-600 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;