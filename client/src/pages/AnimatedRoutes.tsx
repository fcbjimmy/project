import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  About,
  Main,
  Signup,
  Login,
  CreateProducts,
  EditProduct,
  ProductPage,
  Shops,
  CurrentUserProducts,
} from "./";

import useAuthContext from "../hooks/useAuthContext";
type Props = {};

const AnimatedRoutes = (props: Props) => {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Main />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/create"
          element={user ? <CreateProducts /> : <Navigate to="/" />}
        />
        <Route
          path="/usershops"
          element={user ? <CurrentUserProducts /> : <Navigate to="/" />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/allshops" element={<Shops />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
