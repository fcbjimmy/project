import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useProductContext from "../hooks/useProductContext";
import {
  AllProducts,
  ProductCard,
  Hero,
  Categories,
  NewestShops,
  Certified,
} from "../components";
import { products } from "../helpers/data.types";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Main = () => {
  const { user, logout } = useAuthContext();
  const { fetchAllProducts, allProducts, isLoading } = useProductContext();

  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Hero />
        <Categories />
        <NewestShops />
        <Certified />
      </div>
    </motion.div>
  );
};

export default Main;
