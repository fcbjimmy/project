import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import {
  AllProducts,
  CurrentUserProducts,
  ProductCard,
  Hero,
  Categories,
} from "../components";

const Main = () => {
  const { user, logout } = useAuthContext();

  return (
    <div>
      <Hero />
      <Categories />
    </div>
  );
};

export default Main;
