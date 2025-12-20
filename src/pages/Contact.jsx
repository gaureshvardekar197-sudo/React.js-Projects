import React, { useState, useEffect } from "react";
import {
  FiSend,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

const STORAGE_KEY = "contactFormData";

const ContactFormWithSide = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 🔹 Load form data from localStorage on page load */
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  /* 🔹 Handle input change & save to localStorage */
  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  /* 🔹 Submit form */
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate API request
    await new Promise((res) => setTimeout(res, 1000));

    setLoading(false);
    setSubmitted(true);

    // ✅ Clear form inputs
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // ✅ Clear localStorage
    // localStorage.removeItem(STORAGE_KEY);

    // // hide success message after 4 seconds
    // setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden"
      >
        {/* LEFT SIDE — FORM */}
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-500 text-white rounded-full flex items-center justify-center">
                <FiCheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600">
                Thank you — we’ll get back soon.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2">Send a Message</h2>
              <p className="text-gray-600 mb-6">
                We’d love to hear from you.
              </p>

              <form onSubmit={submitForm} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FiUser /> Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FiMail /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <FiMessageSquare /> Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your message..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? "Sending..." : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* RIGHT SIDE — INFO PANEL */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-10 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-6">Let’s Talk</h3>

          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 bg-white rounded-full mt-2"></span>
              Quick and friendly support
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 bg-white rounded-full mt-2"></span>
              Expert assistance always available
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 bg-white rounded-full mt-2"></span>
              Secure communication guaranteed
            </li>
          </ul>

          <p className="mt-10 text-white/80 text-sm">
            We respond within a few hours during business days.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFormWithSide;
