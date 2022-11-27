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
        allProducts: action.payload ? action.payload : [],
        isLoading: false,
      };
    case "GET_USER_PRODUCTS":
      return {
        ...state,
        userProducts: action.payload ? action.payload : [],
        isLoading: false,
      };
    case "SETUP_PRODUCT_LOADING_FALSE":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
