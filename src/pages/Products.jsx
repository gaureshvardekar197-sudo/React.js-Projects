import React, { useState } from "react";
import { useData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const Products = () => {
  const { filteredData, loading } = useData();
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const pageHandler = (selectedPage) => {
    if (selectedPage < 1 || selectedPage > totalPages) return;
    setPage(selectedPage);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 py-20 text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-10 py-6">
      <div className="flex gap-8">

        {/* Filter Section */}
        <FilterSection />

        <div className="flex flex-col w-full">
          {filteredData.length === 0 ? (
            <div className="text-center text-gray-600 py-20 text-xl">
              No products found in this range
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20">
                {filteredData
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
              </div>

              {/* Pagination */}
              <Pagination
                page={page}
                pageHandler={pageHandler}
                totalPages={totalPages}
              />
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Products;
