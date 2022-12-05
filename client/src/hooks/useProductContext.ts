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
    editProduct,
    deleteProduct,
    deleteProductByAdmin,
    fetchAllProductsPage,
  } = contextProductValue;

  return {
    ...state,
    dispatch,
    deleteProduct,
    fetchAllProducts,
    fetchUserProducts,
    createProduct,
    editProduct,
    deleteProductByAdmin,
    fetchAllProductsPage,
  };
};

export default useProductContext;
