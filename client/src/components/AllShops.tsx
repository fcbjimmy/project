import React, { useEffect } from "react";
import { useProductContext } from "../hooks/useProductContext";
// type Props = {}

const AllShops = () => {
  const { userProducts, allProducts } = useProductContext();

  useEffect(() => {
    userProducts();
  }, []);

  if (allProducts) {
    console.log(allProducts);
  }

  return <div>AllShops</div>;
};

export default AllShops;
