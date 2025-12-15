import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { usecart } from "../context/CartContext";

const Navbar = () => {
  const { cartItem } = usecart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-red-500 after:w-full"
      : "text-gray-700 hover:text-red-500 after:w-0";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false); // Close search when opening menu
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMobileMenuOpen(false); // Close menu when opening search
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full backdrop-blur-md bg-white/70 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700 hover:text-red-500 transition"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <div className="flex-1 md:flex-none">
          <Link to="/">
            <h1 className="font-bold text-2xl md:text-3xl tracking-wide text-center md:text-left">
              <span className="text-red-500 font-serif">My</span>Store
            </h1>
          </Link>
        </div>

        {/* Search Box - Desktop */}
        <div className="flex-1 px-4 md:px-10 hidden md:block">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full border border-gray-200 rounded-full px-5 py-2 
                       focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex gap-8 items-center text-lg font-semibold">
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

          {/* Cart Icon */}
          <div className="relative">
            <Link to="/cart" className="text-gray-700 hover:text-red-500 transition">
              <FiShoppingCart className="text-2xl" />
            </Link>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                           rounded-full w-5 h-5 flex items-center justify-center">
              {cartItem.length}
            </span>
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
        <div className="flex items-center gap-4 md:hidden">
          {/* Search Icon Mobile */}
          <button
            className="text-gray-700 hover:text-red-500 transition"
            onClick={toggleSearch}
          >
            <FiSearch className="text-2xl" />
          </button>

          {/* Cart Icon Mobile */}
          <div className="relative">
            <Link to="/cart" className="text-gray-700 hover:text-red-500 transition">
              <FiShoppingCart className="text-2xl" />
            </Link>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                           rounded-full w-5 h-5 flex items-center justify-center">
              {cartItem.length}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4 animate-slideDown">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-200 rounded-full px-5 py-3 
                         focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              autoFocus
            />
            <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-slideDown">
          <nav className="py-6">
            <ul className="flex flex-col gap-6 items-center text-lg font-semibold">
              {navLinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.path}
                  className={linkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <li className="relative cursor-pointer py-2 after:absolute after:left-0 after:-bottom-1 
                                 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300">
                    {link.label}
                  </li>
                </NavLink>
              ))}
              
              {/* Sign In Button in Mobile Menu */}
              <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white 
                                font-semibold px-6 py-3 rounded-full transition duration-300 
                                shadow-md hover:shadow-lg mt-4">
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