import React, { useEffect } from "react";
import useProductContext from "../hooks/useProductContext";
import { products } from "../helpers/data.types";
import { useParams } from "react-router-dom";
import {
  BsFillPinMapFill,
  BsWhatsapp,
  BsLink45Deg,
  BsInstagram,
  BsFacebook,
} from "react-icons/bs";
import { motion } from "framer-motion";

type Props = {};

const ProductPage = (props: Props) => {
  const { allProducts, fetchAllProducts } = useProductContext();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const { id } = useParams();
  const shopId: number = parseInt(id ? id : "");
  const shop = allProducts.find((item) => item.id === shopId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <section className="w-full min-h-full flex justify-center">
        <div className="flex flex-col items-center w-3/4 mt-10">
          <h1 className="text-3xl font-bold border-b-2 self-start border-gray-900">
            Shops
          </h1>
          <div className="mt-4">
            <img className="max-w-xs" src={shop?.logo} alt={shop?.name} />
          </div>
          <div className="text-3xl font-bold mt-4">{shop?.name}</div>
          <div className="m-3">{shop?.description}</div>
          <div>
            <div className="icon-text">
              <BsFillPinMapFill className="text-lg text-gray-600" />
              <span>{shop?.address}</span>
            </div>
            <div className="icon-text">
              <BsWhatsapp className="text-lg text-green-500" />
              <span>{shop?.phone}</span>
            </div>
            <div className="icon-text">
              <BsLink45Deg className="text-lg text-gray-600" />
              <a href={shop?.website} target="_blank" rel="noreferrer">
                {shop?.website}
              </a>
            </div>
          </div>
          <div className="flex self-end gap-3 my-10">
            <a href={shop?.facebook} target="_blank" rel="noreferrer">
              <BsFacebook className="text-2xl text-blue-600" />
            </a>
            <a href={shop?.instagram} target="_blank" rel="noreferrer">
              <BsInstagram className="text-2xl text-purple-400" />
            </a>
          </div>
          <div className="w-full border-b"></div>
          <div className="flex flex-col gap-5 mt-7 lg:flex-row justify-center">
            <img
              className="w-80 md:w-96 xl:w-104"
              src={shop?.sampleImageOne}
              alt={`first${shop?.name}`}
            />
            <img
              className="w-80 md:w-96 xl:w-104"
              src={shop?.sampleImageTwo}
              alt={`second${shop?.name}`}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProductPage;
