import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // Debug function to check if toast is working
  const testToast = () => {
    console.log("Testing toast...");
    toast.success("Test toast message!");
  };

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    try {
      console.log("Adding to cart:", product.title, "Quantity:", product.quantity || quantity);
      
      setCartItem((prev) => {
        const existingProduct = prev.find((item) => item.id === product.id);
        
        // If product already has quantity property (coming from SingleProduct)
        const quantityToAdd = product.quantity || quantity;
        
        if (existingProduct) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          );
        } else {
          return [...prev, { ...product, quantity: quantityToAdd }];
        }
      });
      
      const quantityToAdd = product.quantity || quantity;
      
      // Check if toast function exists
      if (typeof toast.success === 'function') {
        toast.success(`${quantityToAdd} item(s) added to cart`);
      } else {
        console.error("toast.success is not a function");
        alert(`${quantityToAdd} item(s) added to cart`); // Fallback
      }
      
    } catch (error) {
      console.error("Error in addToCart:", error);
      alert(`Error adding to cart: ${error.message}`); // Fallback
    }
  };

  // Remove product from cart
  const deleteItem = (productId) => {
    try {
      setCartItem((prev) => prev.filter((item) => item.id !== productId));
      
      if (typeof toast.error === 'function') {
        toast.error("Product removed");
      } else {
        console.error("toast.error is not a function");
        alert("Product removed"); // Fallback
      }
    } catch (error) {
      console.error("Error in deleteItem:", error);
    }
  };

  // Increase quantity in cart page
  const increaseQuantity = (productId) => {
    setCartItem((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity in cart page
  const decreaseQuantity = (productId) => {
    setCartItem((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              }
            : item
        )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        deleteItem,
        increaseQuantity,
        decreaseQuantity,
        testToast, // Add this for testing
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const usecart = () => useContext(CartContext);