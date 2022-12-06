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
  getallpktspage,
  createuserpkts,
  setuploadingfalse,
  getuserpkts,
  EditProductInputs,
  editpktbegin,
  editpkt,
  deletepkt,
} from "../helpers/data.types";
import { productReducer } from "./reducer";
import useAuthContext from "../hooks/useAuthContext";
import { AllProducts } from "../components";
import { number } from "yup";

interface Props {
  children: ReactNode;
}

//USE TOKEN FROM STATE ❗❗❗❗❗❗❗
// const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");

const initialState: productStateTypes = {
  allProducts: [],
  allProductsPage: [],
  userProducts: [],
  isLoading: false,
  success: false,
};

export const productsContext = createContext<{
  state: productStateTypes;
  dispatch: React.Dispatch<
    | setupbegin
    | getallpkts
    | getallpktspage
    | createuserpkts
    | setuploadingfalse
    | getuserpkts
    | editpktbegin
    | editpkt
    | deletepkt
  >;
  fetchAllProducts: () => void;
  fetchAllProductsPage: (id: string) => void;
  fetchUserProducts: () => void;
  createProduct: (data: CreateProductInputs) => void;
  editProduct: (data: EditProductInputs, shopId: number) => void;
  deleteProduct: (shopId: number) => void;
  deleteProductByAdmin: (shopId: number) => void;
}>({
  state: initialState,
  dispatch: () => {},
  fetchAllProducts: () => {},
  fetchAllProductsPage: () => {},
  fetchUserProducts: () => {},
  createProduct: () => {},
  editProduct: () => {},
  deleteProduct: () => {},
  deleteProductByAdmin: () => {},
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

  const fetchAllProductsPage = async (id: string) => {
    try {
      dispatch({ type: "SETUP_PRODUCT_BEGIN" });
      const { data } = await productFetch.get(`auth/showAllProducts?cat=${id}`);
      const { products }: { products: products[] | [] } = data;
      dispatch({ type: "GET_PRODUCTS_PAGE", payload: products });
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
        location,
        instagram,
        facebook,
      } = data;
      toast.info("Updating", { position: "top-center" });
      const {
        data: productData,
      }: { data: { product: products; msg: string } } = await productFetch.post(
        "product/createProduct",
        {
          name,
          address,
          phone,
          website,
          email,
          description,
          type,
          logo,
          cover,
          location,
          instagram,
          facebook,
        }
      );
      if (state.isLoading) {
        toast.success("Creating, please wait 😉", { position: "top-center" });
      }
      const { product: productCreated, msg } = productData;

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

  const editProduct = async (data: EditProductInputs, shopId: number) => {
    try {
      dispatch({ type: "EDIT_PRODUCT_BEGIN" });
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
        sampleImageOne,
        sampleImageTwo,
        location,
        instagram,
        facebook,
      } = data;
      toast.info("Updating, please wait 😉", { position: "top-center" });
      const {
        data: productData,
      }: { data: { product: products; msg: string } } =
        await productFetch.patch(`product/updateProduct/${shopId}`, {
          name,
          address,
          phone,
          website,
          email,
          description,
          type,
          logo,
          cover,
          location,
          instagram,
          facebook,
          sampleImageOne,
          sampleImageTwo,
        });
      const { product: productEdited, msg } = productData;
      dispatch({ type: "EDIT_PRODUCT", payload: productEdited });
      toast.success(`${msg}`, { position: "top-center" });
    } catch (error) {
      dispatch({ type: "SETUP_PRODUCT_LOADING_FALSE" });
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data}`, { position: "top-center" });
      }
    }
  };

  const deleteProduct = async (shopId: number) => {
    try {
      dispatch({ type: "SETUP_PRODUCT_BEGIN" });
      console.log(shopId);
      const {
        data: { msg },
      } = await productFetch.delete(`product/deleteProduct/${shopId}`);
      dispatch({ type: "DELETE_PRODUCT", payload: { shopId } });
      toast.success(`${msg}`, { position: "top-center" });
    } catch (error) {
      dispatch({ type: "SETUP_PRODUCT_LOADING_FALSE" });
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data}`, { position: "top-center" });
      }
    }
  };

  const deleteProductByAdmin = async (shopId: number) => {
    try {
      dispatch({ type: "SETUP_PRODUCT_BEGIN" });
      console.log(shopId);
      const {
        data: { msg },
      } = await productFetch.delete(`product/deleteProductByAdmin/${shopId}`);
      dispatch({ type: "DELETE_PRODUCT", payload: { shopId } });
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
      editProduct,
      deleteProduct,
      deleteProductByAdmin,
      fetchAllProductsPage,
    }),
    [state, dispatch]
  );

  return (
    <productsContext.Provider value={contextValue}>
      {children}
    </productsContext.Provider>
  );
};
