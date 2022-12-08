import React from "react";
import restau from "../assets/salad.png";
import { Link } from "react-router-dom";

type Props = {
  image: string;
  type: string;
  link: string;
};

const CatCard = ({ image, type, link }: Props) => {
  return (
    <section>
      <div className="">
        <Link to={link}>
          <div className="cursor-pointer flex flex-col items-center border w-[10rem] h-[10rem] rounded-md drop-shadow-xl bg-gradient-to-r from-[#FFEEAD] to-[#fde68a] m-3">
            <img className="w-[6rem] mt-2" src={image} alt="/" />
            <div className="mt-3 text-md text-white font-bold">{type}</div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CatCard;
