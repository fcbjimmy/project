import useAuthContext from "../hooks/useAuthContext";
import useProductContext from "../hooks/useProductContext";
import { ProductCard } from "../components";
import { useEffect } from "react";

type Props = {};

const NewestShops = (props: Props) => {
  const { fetchAllProducts, allProducts } = useProductContext();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <section>
      <h1 className="text-3xl text-forest font-bold text-center m-4">
        Newest Shops
      </h1>
      <div className="flex flex-col items-center md:grid md:grid-cols-2 xl:grid-cols-4 justify-items-center">
        <ProductCard productsProp={allProducts.slice(0, 4)} />
      </div>
    </section>
  );
};

export default NewestShops;
