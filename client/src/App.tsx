import {
  Main,
  Signup,
  Login,
  CreateProducts,
  ProductPage,
  About,
} from "./pages/index";
import { CurrentUserProducts, Navbar } from "./components";
import { Navigate, useLocation, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="bg-slate-100 w-full min-h-screen">
      <ToastContainer />
      <Navbar />
      <Routes>
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
          path="/userProducts"
          element={user ? <CurrentUserProducts /> : <Navigate to="/" />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
