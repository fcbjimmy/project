import React, { useEffect } from "react";
import useProductContext from "../hooks/useProductContext";
import useAuthContext from "../hooks/useAuthContext";
import ProductCard from "../components/Product.Card";
import img from "../assets/tabs.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CurrentUserProducts = () => {
  const { fetchUserProducts, userProducts } = useProductContext();
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    fetchUserProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <section className="w-full min-h-screen">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col mt-10 max-w-[375px] md:max-w-2xl lg:max-w-4xl mx-auto">
            <div className="flex justify-between border-b-2 border-black">
              <div className="text-2xl font-bold ">User Shops</div>
              <div>
                <Link to={"/create"}>
                  <img
                    className="w-8 hover:scale-105 duration-150 active:translate-y-1 md:hidden"
                    src={img}
                    alt="/"
                  />
                </Link>
                <div className="mdmax:hidden cursor-pointer border hover:scale-105 duration-150 active:translate-y-1 create-pkt-button ">
                  <Link to={"/create"}>
                    <span className="">Create</span>
                  </Link>
                </div>
              </div>
            </div>
            {userProducts.length < 1 ? (
              <div className="text-xl mt-8">No Shops</div>
            ) : (
              <div className="self-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-20">
                <ProductCard productsProp={userProducts} />
              </div>
            )}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default CurrentUserProducts;
