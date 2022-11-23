import { createContext, useReducer, ReactNode, useMemo } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import {
  SignupFormInputs,
  LoginFormInputs,
  stateTypes,
  appAction,
  setLocaleStorage,
  userTypes,
} from "../helpers/data.types";
import { authReducer } from "./reducer";

interface Props {
  children: ReactNode;
}

// interface AppContext {
//   // signup: (data: SignupFormInputs) => Promise<void>;
//   login: (data: LoginFormInputs) => Promise<void>;
//   signup: (data: SignupFormInputs) => Promise<void>;
// }

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState: stateTypes = {
  user: user ? JSON.parse(user) : null,
  isLoading: false,
  token: token ? token : null,
};

export const AuthContext = createContext<{
  state: stateTypes;
  dispatch: React.Dispatch<appAction>;
  login: (data: LoginFormInputs) => void;
  signup: (data: SignupFormInputs) => void;
  logout: () => void;
}>({
  state: initialState,
  dispatch: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // interface CommonHeaderProperties extends HeadersDefaults {
  //   Authorization: string;
  // }

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // authFetch.defaults.headers = {
  //   Authorization: `Bearer authToken`,
  // } as CommonHeaderProperties;

  authFetch.interceptors.request.use(
    (config) => {
      if (config.headers !== undefined)
        config.headers["Authorization"] = `Bearer ${state?.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
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

  const setUserToLocalStorage = ({ user, token }: setLocaleStorage) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const signup = async ({
    name,
    email,
    password,
    confirmPassword,
  }: SignupFormInputs) => {
    try {
      dispatch({ type: "SETUP_USER_BEGIN" });
      const { data } = await authFetch.post("auth/signup", {
        name,
        email,
        password,
      });
      const { user, token } = data;
      dispatch({
        type: "SETUP_USER_SUCCESS",
        payload: {
          name: user.name,
          email: user.email,
          id: user.id,
          role: user.role,
          token,
        },
      });
      setUserToLocalStorage({ token, user });
      toast.success("Logged in", { position: "top-center" });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ email, password }: LoginFormInputs) => {
    try {
      dispatch({ type: "SETUP_USER_BEGIN" });
      const { data } = await authFetch.post("auth/login", { email, password });
      const { token, user } = data;
      dispatch({
        type: "SETUP_USER_SUCCESS",
        payload: {
          name: user.name,
          email: user.email,
          id: user.id,
          role: user.role,
          token,
        },
      });
      setUserToLocalStorage({ token, user });
      toast.success("User created", { position: "top-center" });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data}`, { position: "top-center" });
      }
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    removeUserFromLocalStorage();
  };

  const contextValue = useMemo(
    () => ({ state, dispatch, login, signup, logout }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
