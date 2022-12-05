import React, { useEffect, useState } from "react";
import useProductContext from "../hooks/useProductContext";
import ProductCard from "./Product.Card";
import { types } from "../helpers/options";

// type Props = {}

// const types = [
//   "All",
//   "Restaurant",
//   "Shopping",
//   "Health and Beauty",
//   "Grocery",
//   "other",
// ];

const AllProducts = () => {
  const { fetchAllProducts, allProducts, isLoading } = useProductContext();
  const [filter, setFilter] = useState<string>("0");

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // if (allProducts) {
  //   console.log(allProducts);
  // }
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setFilter(e.target.value);
  };

  const filteredShops = allProducts.filter((item, index) => {
    if (filter === "") {
      return item;
    }
    return item.type === filter;
  });

  return (
    <section className="w-full min-h-screen">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col mt-10 max-w-[375px] mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <div className="border-b-2 border-black">
            <span className="text-2xl font-bold">All Local Shops</span>
          </div>
          <div className="flex gap-3 mt-8">
            <div className="text-lg font-bold">Category</div>
            <select
              className="p-1"
              name="category"
              onChange={handleChangeSelect}
            >
              <option value="">All</option>
              {types.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          {allProducts.length < 1 ? (
            <div className="mt-8">No Shops</div>
          ) : (
            <div className="flex-col self-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-20 xl:grid-cols-4 xl:gap-x-16">
              <ProductCard productsProp={filteredShops} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AllProducts;
