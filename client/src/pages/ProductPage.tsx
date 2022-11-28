import React from "react";
import useProductContext from "../hooks/useProductContext";
import { useParams } from "react-router-dom";
type Props = {};

const ProductPage = (props: Props) => {
  const { allProducts } = useProductContext();
  let { id } = useParams();
  const shopId = parseInt(id ? id : "");
  const shop = allProducts.find((item, index) => {
    return item.id === shopId;
  });
  console.log(shop);
  return <div>{shop?.name}</div>;
};

export default ProductPage;
