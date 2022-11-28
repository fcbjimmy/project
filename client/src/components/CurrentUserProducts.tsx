import React, { useEffect } from "react";
import useProductContext from "../hooks/useProductContext";
import useAuthContext from "../hooks/useAuthContext";
import ProductCard from "./Product.Card";

const CurrentUserProducts = () => {
  const { fetchUserProducts, userProducts } = useProductContext();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchUserProducts();
  }, [user]);

  if (userProducts) {
    console.log(userProducts);
  }

  return (
    <>
      <div>User Products</div>
      <ProductCard productsProp={userProducts} />
    </>
  );
};

export default CurrentUserProducts;
