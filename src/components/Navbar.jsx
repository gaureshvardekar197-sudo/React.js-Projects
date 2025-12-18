import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiHeart,
} from "react-icons/fi";
import { usecart } from "../context/CartContext";

const Navbar = () => {
  const { cartItem, wishlistItems } = usecart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-red-500 after:w-full"
      : "text-gray-700 hover:text-red-500 after:w-0";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full backdrop-blur-md bg-white/70 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:py-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl text-gray-700 hover:text-red-500 transition"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <div className="flex-1 lg:flex-none">
          <Link to="/">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide text-center lg:text-left">
              <span className="text-red-500 font-serif">My</span>Store
            </h1>
          </Link>
        </div>

        {/* Search - Desktop & Tablet */}
        <div className="hidden sm:block flex-1 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full border border-gray-200 rounded-full px-4 sm:px-5 py-2 
                         focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         text-gray-500 hover:text-red-500 transition"
            >
              <FiSearch className="text-xl" />
            </button>
          </form>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <nav>
            <ul className="flex gap-6 items-center text-lg font-semibold">
              {navLinks.map((link, i) => (
                <NavLink key={i} to={link.path} className={linkClass}>
                  <li className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 
                                 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300">
                    {link.label}
                  </li>
                </NavLink>
              ))}
            </ul>
          </nav>

          {/* Wishlist */}
          <div className="relative">
            <Link to="/wishlist" className="text-gray-700 hover:text-red-500 transition">
              <FiHeart className="text-2xl" />
            </Link>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                              rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart" className="text-gray-700 hover:text-red-500 transition">
              <FiShoppingCart className="text-2xl" />
            </Link>
            {cartItem.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                              rounded-full w-5 h-5 flex items-center justify-center">
                {cartItem.length}
              </span>
            )}
          </div>

          {/* Sign In */}
          <Link to="/signin">
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white 
                            font-semibold px-5 py-2 rounded-full transition duration-300 
                            shadow-md hover:shadow-lg">
              <FiUser className="text-lg" />
              Sign In
            </button>
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 sm:hidden">
          <button
            className="text-gray-700 hover:text-red-500 transition"
            onClick={toggleSearch}
          >
            <FiSearch className="text-2xl" />
          </button>

          {/* Wishlist */}
          <div className="relative">
            <Link to="/wishlist" className="text-gray-700 hover:text-red-500 transition">
              <FiHeart className="text-2xl" />
            </Link>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                              rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart" className="text-gray-700 hover:text-red-500 transition">
              <FiShoppingCart className="text-2xl" />
            </Link>
            {cartItem.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                              rounded-full w-5 h-5 flex items-center justify-center">
                {cartItem.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="sm:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full border border-gray-200 rounded-full px-5 py-3 
                         focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 
                         text-gray-500 hover:text-red-500 transition"
            >
              <FiSearch className="text-xl" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="py-6">
            <ul className="flex flex-col gap-6 items-center text-lg font-semibold">
              {navLinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.path}
                  className={linkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <li className="py-2">{link.label}</li>
                </NavLink>
              ))}

              {/* Mobile Sign In */}
              <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white 
                                font-semibold px-6 py-3 rounded-full mt-4">
                  <FiUser className="text-lg" />
                  Sign In
                </button>
              </Link>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
