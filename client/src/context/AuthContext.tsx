import React, { createContext, useReducer } from "react";
import axios from "axios";
import { SignupFormInputs, LoginFormInputs } from "../helpers/data.types";

interface Props {
  children: React.ReactNode;
}

interface AppContext {
  // signup: (data: SignupFormInputs) => Promise<void>;
  login: (data: LoginFormInputs) => Promise<void>;
  signup: (data: SignupFormInputs) => Promise<void>;
}

export const AuthContext = createContext<AppContext | null>(null);

export const AuthContextProvider = ({ children }: Props) => {
  const signup = async (data: SignupFormInputs) => {
    console.log(data);
  };

  const login = async (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <AuthContext.Provider value={{ signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};
