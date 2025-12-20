import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const [cartItem, setCartItem] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Load wishlist from localStorage on initial render
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItem));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
      toast.error("Failed to save cart data");
    }
  }, [cartItem]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
      toast.error("Failed to save wishlist data");
    }
  }, [wishlistItems]);

  // Debug function to check if toast is working
  const testToast = () => {
    console.log("Testing toast...");
    toast.success("Test toast message!");
  };

  // Clear all cart items
  const clearCart = () => {
    setCartItem([]);
    toast.info("Cart cleared");
  };

  // Get total items count
  const getCartTotalItems = () => {
    return cartItem.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getCartTotalPrice = () => {
    return cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
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
          const updatedCart = prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          );
          return updatedCart;
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
      toast.error(`Error adding to cart: ${error.message}`);
    }
  };

  // Remove product from cart
  const deleteItem = (productId) => {
    try {
      setCartItem((prev) => {
        const updatedCart = prev.filter((item) => item.id !== productId);
        return updatedCart;
      });
      
      if (typeof toast.error === 'function') {
        toast.error("Product removed");
      } else {
        console.error("toast.error is not a function");
        alert("Product removed");
      }
    } catch (error) {
      console.error("Error in deleteItem:", error);
      toast.error("Error removing product");
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

  // Update quantity directly
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItem((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItem.some((item) => item.id === productId);
  };

  /* ================= WISHLIST FUNCTIONS ================= */
  const toggleWishlist = (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);

    if (exists) {
      setWishlistItems((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
      toast.error("Removed from wishlist");
    } else {
      setWishlistItems((prev) => [...prev, product]);
      toast.success("Added to wishlist ❤️");
    }
  };

  const isWishlisted = (id) =>
    wishlistItems.some((item) => item.id === id);

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    toast.info("Wishlist cleared");
  };

  return (
    <CartContext.Provider
      value={{
        // Cart
        cartItem,
        addToCart,
        deleteItem,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        getCartTotalItems,
        getCartTotalPrice,
        isInCart,
        testToast,
        
        // Wishlist
        wishlistItems,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const usecart = () => useContext(CartContext);