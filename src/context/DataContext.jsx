import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // FILTER LOGIC
  useEffect(() => {
    let products = [...data];

    if (category !== "all") {
      products = products.filter((prod) => prod.category === category);
    }

    // if (brand !== "all") {
    //   products = products.filter((prod) =>
    //     prod.title.toLowerCase().includes(brand.toLowerCase())
    //   );
    // }

    products = products.filter(
      (prod) => prod.price >= priceRange[0] && prod.price <= priceRange[1]
    );

    setFilteredData(products);
  }, [category, brand, priceRange, data]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        filteredData,
        loading,
        category,
        setCategory,
        // brand,
        // setBrand,
        priceRange,
        setPriceRange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
