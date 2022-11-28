import { Main, Signup, Login, CreateProducts } from "./pages/index";
import { CurrentUserProducts } from "./components";
import { Navigate, useLocation, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Main />}></Route>
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
      </Routes>
    </>
  );
}

export default App;
