import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  const { state, dispatch, login, signup, logout } = contextValue;
  return { ...state, dispatch, login, signup, logout };
};

export default useAuthContext;
