import React, { useEffect, useState } from "react";
import useProductContext from "../hooks/useProductContext";
import ProductCard from "./Product.Card";
// import { types } from "../helpers/options";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
// type Props = {}

const types = [
  "All",
  "Restaurant",
  "Shopping",
  "Health and Beauty",
  "Grocery",
  "other",
];

const AllProducts = () => {
  const { fetchAllProducts, allProducts, isLoading } = useProductContext();
  const [filter, setFilter] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    //
    fetchAllProducts();
    const test = searchParams.get("cat");
    if (test !== null) {
      const cat = parseInt(test);
      setFilter(cat);
    }
  }, []);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(e.target.value);
    setFilter(number);
    navigate(`/allshops?cat=${e.target.value}`);
  };

  const filteredShops = allProducts.filter((item) => {
    if (filter === 0) {
      return item;
    } else if (filter === 1 || 2 || 3 || 4) return item.type === types[filter];
  });

  return (
    <section className="w-full min-h-screen">
      {isLoading ? (
        <div className="w-screen flex justify-center items-center h-screen">
          Loading... 🧘
        </div>
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
              value={filter}
            >
              {types.map((item, index) => {
                return (
                  <option value={index} key={index}>
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
