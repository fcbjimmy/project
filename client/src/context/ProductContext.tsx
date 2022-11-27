import {
  createContext,
  useReducer,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import {
  productStateTypes,
  products,
  CreateProductInputs,
  setupbegin,
  getallpkts,
  createuserpkts,
  setuploadingfalse,
  getuserpkts,
} from "../helpers/data.types";
import { productReducer } from "./reducer";
import useAuthContext from "../hooks/useAuthContext";

interface Props {
  children: ReactNode;
}

//USE TOKEN FROM STATE ❗❗❗❗❗❗❗
// const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");

const initialState: productStateTypes = {
  allProducts: [],
  userProducts: [],
  isLoading: false,
};

export const productsContext = createContext<{
  state: productStateTypes;
  dispatch: React.Dispatch<
    setupbegin | getallpkts | createuserpkts | setuploadingfalse | getuserpkts
  >;
  fetchAllProducts: () => void;
  fetchUserProducts: () => void;
  createProduct: (data: CreateProductInputs) => void;
}>({
  state: initialState,
  dispatch: () => {},
  fetchAllProducts: () => {},
  fetchUserProducts: () => {},
  createProduct: () => {},
});

export const ProductContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const { user, token } = useAuthContext();

  useEffect(() => {}, [user, token]);

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

  const fetchAllProducts = async () => {
    try {
      dispatch({ type: "SETUP_PRODUCT_BEGIN" });
      const { data } = await productFetch.get("auth/showAllProducts");
      const { products }: { products: products[] | [] } = data;
      dispatch({ type: "GET_PRODUCTS", payload: products });
    } catch (error) {
      dispatch({ type: "SETUP_PRODUCT_LOADING_FALSE" });
      console.log(error);
    }
  };

  const fetchUserProducts = async () => {
    try {
      dispatch({ type: "SETUP_PRODUCT_BEGIN" });
      const { data }: { data: products[] | [] } = await productFetch.get(
        "product/showProducts"
      );
      dispatch({ type: "GET_USER_PRODUCTS", payload: data });
    } catch (error) {
      dispatch({ type: "SETUP_PRODUCT_LOADING_FALSE" });
      console.log(error);
    }
  };

  const createProduct = async (data: CreateProductInputs) => {
    try {
      dispatch({ type: "SETUP_PRODUCT_BEGIN" });
      const {
        name,
        address,
        phone,
        website,
        email,
        description,
        type,
        logo,
        cover,
      } = data;
      const {
        data: productData,
      }: { data: { products: products; msg: string } } =
        await productFetch.post("product/createProduct", {
          name,
          address,
          phone,
          website,
          email,
          description,
          type,
          logo,
          cover,
        });

      const { products: productCreated, msg } = productData;

      dispatch({ type: "CREATE_PRODUCTS", payload: productCreated });
      toast.success(`${msg}`, { position: "top-center" });
    } catch (error) {
      dispatch({ type: "SETUP_PRODUCT_LOADING_FALSE" });
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data}`, { position: "top-center" });
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      fetchAllProducts,
      fetchUserProducts,
      createProduct,
    }),
    [state, dispatch]
  );

  return (
    <productsContext.Provider value={contextValue}>
      {children}
    </productsContext.Provider>
  );
};
