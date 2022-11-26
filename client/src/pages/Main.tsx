import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { AllShops } from "../components";

const Main = () => {
  const { user, logout } = useAuthContext();

  return (
    <div>
      Main Page
      <div className="bg-red-600 text-blue-300">hello</div>
      {user ? (
        <>
          <h1>hi {user?.name}</h1>
          <button onClick={logout} className="bg-white border-2 text-blue-300">
            logout
          </button>
        </>
      ) : (
        <>
          <div>
            <Link to="/login">Login here</Link>
          </div>
          <div>
            <Link to="/signup">Signup here</Link>
          </div>
        </>
      )}
      <AllShops />
    </div>
  );
};

export default Main;