import "./App.css";
import { Main, Signup, Login } from "./pages/index";
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
      </Routes>
    </>
  );
}

export default App;
