import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // Add product to cart
  // const addToCart = (product) => {
  //   // Check if product already exists
  //   const existingProduct = cartItem.find(item => item.id === product.id);
  //   if (existingProduct) {
  //     setCartItem(prev =>
  //       prev.map(item =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );
  //   } else {
  //     setCartItem(prev => [...prev, { ...product, quantity: 1 }]);
  //   }
  //   toast.success("Product added to cart");
  // };
// Add or update product in cart
const addToCart = (product) => {
  setCartItem(prev => {
    const existingProduct = prev.find(item => item.id === product.id);
    if (existingProduct) {
      // Replace the quantity with the new quantity from SingleProduct
      return prev.map(item =>
        item.id === product.id ? { ...item, quantity: product.quantity } : item
      );
    } else {
      return [...prev, { ...product }];
    }
  });
  toast.success("Product added in cart");
};

  // Remove product from cart
  const deleteItem = (productId) => {
    setCartItem(prev => prev.filter(item => item.id !== productId));
    toast.error("Product removed");
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCartItem(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCartItem(prev =>
      prev
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItem, addToCart, deleteItem, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const usecart = () => useContext(CartContext);
