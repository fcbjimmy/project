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
          : action.payload,
        token: action.payload?.token,
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
    default:
      return state;
  }
};
