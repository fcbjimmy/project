import {
  Main,
  Signup,
  Login,
  CreateProducts,
  ProductPage,
  About,
  EditProduct,
  AnimatedRoutes,
} from "./pages/index";
import { Navbar, Modal, AllProducts, Footer } from "./components";
import { Navigate, useLocation, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "./hooks/useAuthContext";
import { modalContext } from "./context/ModalContext";
import { useContext } from "react";

function App() {
  const { user } = useAuthContext();
  const { modal } = useContext(modalContext);

  return (
    <div className="bg-zinc-100 w-screen min-h-screen">
      <ToastContainer />
      <Navbar />
      <AnimatedRoutes />
      {/* <Routes>
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
        <Route path="/allshops" element={<AllProducts />} />
      </Routes> */}
      <Footer />
      {modal && <Modal />}
    </div>
  );
}

export default App;
