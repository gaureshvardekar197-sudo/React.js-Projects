import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:py-16 sm:px-6 mt-7">
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mt-3 sm:mt-4 px-2">
          Discover who we are, what we stand for, and why we love what we do.
        </p>
      </motion.div>

      {/* OUR STORY SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto mb-12 sm:mb-16 bg-white shadow-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 flex items-center gap-3">
          <FiHeart className="text-red-500 text-xl sm:text-2xl" />
          Our Story
        </h2>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
          Welcome to <strong>MyStore</strong> — your trusted hub for modern, 
          high-quality essentials. We started with one clear goal: to make
          online shopping easy, reliable, and enjoyable. From trending gadgets 
          to home must-haves, we bring products you love straight to your door.
        </p>
      </motion.div>

      {/* MISSION & VISION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
        
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow hover:shadow-xl transition border"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 flex items-center gap-2">
            <FiTarget className="text-blue-500 text-lg sm:text-xl" /> Our Mission
          </h3>
          <p className="text-gray-700 text-base sm:text-lg">
            To make online shopping simple, affordable, and enjoyable for everyone —
            with unbeatable customer support and a top-tier selection.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow hover:shadow-xl transition border"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 flex items-center gap-2">
            <FiUsers className="text-green-500 text-lg sm:text-xl" /> Our Vision
          </h3>
          <p className="text-gray-700 text-base sm:text-lg">
            To become the most trusted online marketplace where customers always 
            find what they need — fast, safe, and stress-free.
          </p>
        </motion.div>
      </div>

      {/* TEAM SECTION - 2 cards per row on mobile */}
      <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Meet the Team</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
          {[
            { name: "Alice Johnson", role: "Founder & CEO", img: 1 },
            { name: "Michael Lee", role: "Head of Operations", img: 2 },
            { name: "Sophia Brown", role: "Marketing Lead", img: 3 },
            { name: "Daniel Smith", role: "Product Manager", img: 4 },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow hover:shadow-xl transition text-center border"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${member.img}`}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full mx-auto mb-3 sm:mb-4 shadow-md"
              />
              <h3 className="font-semibold text-base sm:text-lg md:text-xl">{member.name}</h3>
              <p className="text-gray-500 text-xs sm:text-sm md:text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;