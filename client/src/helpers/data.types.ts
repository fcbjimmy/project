import { string } from "yup";

// signup form
export interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// login form
export interface LoginFormInputs {
  email: string;
  password: string;
}

// create product form
export interface CreateProductInputs {
  address: string;
  description: string;
  email: string;
  name: string;
  phone: number;
  type: string;
  website: string;
  cover: string | ArrayBuffer | null;
  logo: string | ArrayBuffer | null;
  // logo: { [key: string]: File } | string;
}

//auth context

export interface setLocaleStorage {
  user: userTypes | null | string;
  token: string;
}

export interface productTypes {
  id: number;
  name: string;
  address: string;
  phone: number;
  website: string;
  email: string;
  description: string;
  type: string;
  logo: string;
  cover: string;
  sampleImageOne: string;
  sampleImageTwo: string;
}

export interface userTypes {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface stateTypes {
  user: userTypes | null;
  isLoading: true | false;
  token: string | null;
}

// reducer
//Authreducer
export interface appState {}

// export interface appAction {
//   type:
//     | "SETUP_USER_BEGIN"
//     | "SETUP_USER_ERROR"
//     | "SETUP_USER_SUCCESS"
//     | "LOGOUT"
//     | "SETUP_PRODUCT_BEGIN"
//     | "SETUP_PRODUCT_ERROR"
//     | "SETUP_EDIT_BEGIN"
//     | "SETUP_DELETE_BEGIN"
//     | "SETUP_EDIT_SUCCESS"
//     | "SETUP_DELETE_SUCCESS"
//     | "USER_EDIT_BEGIN"
//     | "USER_EDIT_SUCCESS"
//     | "GET_PRODUCTS"
//     | "CREATE_PRODUCTS";
//   payload?: productTypes & stateTypes;
// }

type authPayload = {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
};

export interface appAction {
  type:
    | "SETUP_USER_BEGIN"
    | "SETUP_USER_ERROR"
    | "SETUP_USER_SUCCESS"
    | "LOGOUT";
  payload?: {
    id: number;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}

export type ReducerType = (state: stateTypes, action: appAction) => stateTypes;

//productreducer

export type products = {
  id: number;
  name: string;
  address: string;
  phone: number;
  website: string;
  email: string;
  description: string;
  type: string;
  logo: string;
  cover: string;
  sampleImageOne: string;
  sampleImageTwo: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export interface productStateTypes {
  allProducts: products[] | [];
  userProducts: products[] | [];
  isLoading: true | false;
}

// export interface productAction {
//   type:
//     | "SETUP_PRODUCT_BEGIN"
//     | "GET_USER_PRODUCTS"
//     | "SETUP_PRODUCT_ERROR"
//     | "SETUP_EDIT_BEGIN"
//     | "SETUP_DELETE_BEGIN"
//     | "GET_PRODUCTS"
//     // | "CREATE_PRODUCTS"
//     | "SETUP_PRODUCT_LOADING_FALSE";
//   payload?: products[] | products | [];
// }

//test

export type setupbegin = {
  type: "SETUP_PRODUCT_BEGIN";
};

export type createuserpkts = {
  type: "CREATE_PRODUCTS";
  payload: products;
};

export type getallpkts = {
  type: "GET_PRODUCTS";
  payload: products[] | [];
};

export type setuploadingfalse = {
  type: "SETUP_PRODUCT_LOADING_FALSE";
};

export type getuserpkts = {
  type: "GET_USER_PRODUCTS";
  payload: products[] | [];
};

export type productReducerType = (
  state: productStateTypes,
  action:
    | setupbegin
    | getallpkts
    | createuserpkts
    | setuploadingfalse
    | getuserpkts
) => productStateTypes;
