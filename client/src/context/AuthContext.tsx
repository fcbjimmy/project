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
  SignupFormInputs,
  LoginFormInputs,
  stateTypes,
  appAction,
  setLocaleStorage,
} from "../helpers/data.types";
import { authReducer } from "./reducer";

interface Props {
  children: ReactNode;
}

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

  useEffect(() => {}, []);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

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
      toast.success("Signed in", { position: "top-center" });
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data}`, { position: "top-center" });
      }
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
      toast.success(`Welcome ${user.name}`, { position: "top-center" });
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
    toast.success("Logged out 👋", { position: "top-center" });
  };

  const contextValue = useMemo(
    () => ({ state, dispatch, login, signup, logout }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
