import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";
import img from "../assets/certified.png";

type Props = {
  name: string;
  location: string;
  type: string;
  cover: string;
};

const SampleProduct = ({ name, location, type, cover }: Props) => {
  // const handleClick=()=>{

  // }
  return (
    <>
      <div className=" cursor-pointer w-60 h-80 border-none rounded-2xl shadow-xl bg-slate-100 hover:shadow-3xl ease-in hover:duration-150">
        <span>
          <div className="flex justify-center">
            <img
              className="h-32 w-full  rounded-t-2xl object-cover"
              src={cover}
              alt={name}
            />
          </div>
          <div className="h-32">
            <div className="flex justify-center items-center my-2.5">
              <span className="text-xs">{type}</span>
              <span>&nbsp;|&nbsp;</span>
              <span className="text-xs">{location}</span>
            </div>
            <p className="text-center font-bold text-xl my-1">{name}</p>
            <img className="w-12 object-cover mx-auto" src={img} alt="hello" />
          </div>
        </span>
        <div className="flex justify-end mr-2">
          <FaInstagramSquare className="text-3xl mx-1" />
          <FaWhatsappSquare className="text-3xl mx-1" />
        </div>
      </div>
    </>
  );
};

export default SampleProduct;
