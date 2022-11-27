import React, { useEffect } from "react";
import useProductContext from "../hooks/useProductContext";
import useAuthContext from "../hooks/useAuthContext";

const CurrentUserProducts = () => {
  const { fetchUserProducts, userProducts } = useProductContext();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchUserProducts();
  }, [user]);

  if (userProducts) {
    console.log(userProducts);
  }

  return <div>User Products</div>;
};

export default CurrentUserProducts;
