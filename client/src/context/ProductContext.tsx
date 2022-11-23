import { createContext, useReducer, ReactNode, useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { productStateTypes, productAction } from "../helpers/data.types";
import { productReducer } from "./reducer";

interface Props {
  children: ReactNode;
}

const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");

const initialState: productStateTypes = {
  allProducts: [],
  userProducts: [],
};

export const productsContext = createContext<{
  state: productStateTypes;
  dispatch: React.Dispatch<productAction>;
  userProducts: () => void;
}>({
  state: initialState,
  dispatch: () => {},
  userProducts: () => {},
});

export const ProductContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const productFetch = axios.create({
    baseURL: "/api/v1",
  });

  productFetch.interceptors.request.use(
    (config) => {
      if (config.headers !== undefined)
        config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  productFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        toast.error("Authentication error 401", { position: "top-center" });
      }
      return Promise.reject(error);
    }
  );

  const userProducts = async () => {
    try {
      const { data } = await productFetch.get("product/showProducts");
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = useMemo(
    () => ({ state, dispatch, userProducts }),
    [state, dispatch]
  );

  return (
    <productsContext.Provider value={contextValue}>
      {children}
    </productsContext.Provider>
  );
};
