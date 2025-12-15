import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <DataProvider>
            <CartProvider>
                <App />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                   
                />
            </CartProvider>
        </DataProvider>
    </React.StrictMode>
);
