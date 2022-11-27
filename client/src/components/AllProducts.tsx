import React, { useEffect } from "react";
import useProductContext from "../hooks/useProductContext";
// type Props = {}

const AllProducts = () => {
  const { fetchAllProducts } = useProductContext();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // if (allProducts) {
  //   console.log(allProducts);
  // }

  return <div>AllProducts</div>;
};

export default AllProducts;
