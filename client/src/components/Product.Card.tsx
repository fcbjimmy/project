import React from "react";
import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";
import { isTypeNode } from "typescript";
import img from "../assets/certified.png";
import { products } from "../helpers/data.types";
import { useNavigate } from "react-router-dom";

type Props = {
  productsProp: products[] | [];
};

const ProductCard = ({ productsProp }: Props) => {
  const navigate = useNavigate();

  // const handleClick=()=>{

  // }
  return (
    <>
      {productsProp.map((item, index) => {
        return (
          <div
            key={index}
            className=" cursor-pointer w-60 h-80 border-none rounded-2xl shadow-xl bg-slate-100 hover:shadow-3xl ease-in hover:duration-150"
          >
            <span onClick={(): void => navigate(`/product/${item.id}`)}>
              <div className="flex justify-center">
                <img
                  className="h-32 w-full  rounded-t-2xl object-cover"
                  src={item.cover}
                  alt={item.name}
                />
              </div>
              <div className="h-32">
                <div className="flex justify-center items-center my-2.5">
                  <span className="text-xs">{item.type}</span>
                  <span>&nbsp;|&nbsp;</span>
                  <span className="text-xs">{item.location}</span>
                </div>
                <p className="text-center font-bold text-xl my-1">
                  {item.name}
                </p>
                <img
                  className="w-12 object-cover mx-auto"
                  src={img}
                  alt="hello"
                />
              </div>
            </span>
            <div className="flex justify-end text-3xl gap-2 w-56">
              <FaInstagramSquare />
              <FaWhatsappSquare />
            </div>
          </div>
        );
      })}
      {/* <div className=" cursor-pointer w-60 h-80 border-none rounded-2xl shadow-xl bg-slate-100 hover:shadow-3xl ease-in hover:duration-150">
        <div className="flex justify-center">
          <img
            className="h-32 w-full  rounded-t-2xl object-cover"
            src="https://res.cloudinary.com/dp5axfdaj/image/upload/v1668699843/cld-sample-5.jpg"
            alt="test"
          />
        </div>
        <div className="h-32">
          <div className="flex justify-center items-center my-2.5">
            <span className="text-xs">Health and Beauty</span>
            <span>&nbsp;|&nbsp;</span>
            <span className="text-xs">Causeway Bay</span>
          </div>
          <p className="text-center font-bold text-xl my-1">Nike</p>
          <img className="w-12 object-cover mx-auto" src={img} alt="hello" />
        </div>
        <div className="flex justify-end text-3xl gap-2 w-56">
          <FaInstagramSquare />
          <FaWhatsappSquare />
        </div>
      </div> */}
    </>
  );
};

export default ProductCard;
