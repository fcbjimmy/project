import { useContext } from "react";
import { productsContext } from "../context/ProductContext";

const useProductContext = () => {
  const contextProductValue = useContext(productsContext);
  if (!contextProductValue) {
    throw Error("useProductContext must be used inside an AuthContextProvider");
  }
  const {
    state,
    dispatch,
    fetchAllProducts,
    fetchUserProducts,
    createProduct,
  } = contextProductValue;
  return {
    ...state,
    dispatch,
    fetchAllProducts,
    fetchUserProducts,
    createProduct,
  };
};

export default useProductContext;
