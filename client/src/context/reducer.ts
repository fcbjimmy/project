import { ReducerType, productReducerType } from "../helpers/data.types";

export const authReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "SETUP_USER_BEGIN":
      return {
        ...state,
        isLoading: true,
      };
    case "SETUP_USER_SUCCESS":
      return {
        ...state,
        user: action.payload
          ? {
              name: action.payload.name,
              email: action.payload.email,
              role: action.payload.role,
              id: action.payload.id,
            }
          : null,
        token: action.payload ? action.payload.token : null,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const productReducer: productReducerType = (state, action) => {
  switch (action.type) {
    case "SETUP_PRODUCT_BEGIN":
      return { ...state, isLoading: true };
    case "GET_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
        isLoading: false,
      };
    case "GET_PRODUCTS_PAGE":
      return {
        ...state,
        allProductsPage: action.payload,
        isLoading: false,
      };
    case "GET_USER_PRODUCTS":
      return {
        ...state,
        userProducts: action.payload,
        isLoading: false,
      };
    case "CREATE_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        userProducts: [action.payload, ...state.userProducts],
        allProducts: [action.payload, ...state.allProducts],
      };
    case "EDIT_PRODUCT_BEGIN":
      return { ...state, isLoading: true, success: false };
    case "EDIT_PRODUCT":
      const index = action.payload.id;
      const filteredArray = state.allProducts.filter((item) => {
        return item.id !== index;
      });
      const filteredArrayUser = state.userProducts.filter((item) => {
        return item.id !== index;
      });
      return {
        ...state,
        isLoading: false,
        userProducts: [...filteredArrayUser, action.payload],
        allProducts: [...filteredArray, action.payload],
      };
    case "DELETE_PRODUCT":
      const { shopId } = action.payload;
      const deleteItemAllProducts = state.allProducts.filter((item) => {
        return item.id !== shopId;
      });
      const deleteItemUserProducts = state.userProducts.filter((item) => {
        return item.id !== shopId;
      });
      return {
        ...state,
        isLoading: false,
        allProducts: [...deleteItemAllProducts],
        userProducts: [...deleteItemUserProducts],
      };
    case "SETUP_PRODUCT_LOADING_FALSE":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
