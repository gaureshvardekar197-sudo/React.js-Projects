import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

const Sign = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (isLogin) {
        const userFound = users.find(u => u.email === formData.email && u.password === formData.password);
        if (userFound) {
          toast.success("Login successful!");
          login(userFound);
          navigate("/");
        } else {
          setError("Invalid email or password");
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        const existingUser = users.find(u => u.email === formData.email);
        if (existingUser) {
          setError("Email already registered");
        } else {
          const newUser = { name: formData.name, email: formData.email, password: formData.password };
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
          login(newUser);
          toast.success("Registration successful!");
          setIsLogin(true);
          navigate("/");
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-50 mt-20">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-500">{isLogin ? "Welcome Back!" : "Create Account"}</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block mb-2 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-2 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 cursor-pointer font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sign;
