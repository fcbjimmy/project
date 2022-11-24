import { useContext } from "react";
import { productsContext } from "../context/ProductContext";

export const useProductContext = () => {
  const contextProductValue = useContext(productsContext);
  if (!contextProductValue) {
    throw Error("useProductContext must be used inside an AuthContextProvider");
  }
  const { state, dispatch, userProducts } = contextProductValue;
  return { ...state, dispatch, userProducts };
};
