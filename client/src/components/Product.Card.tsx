import { useContext } from "react";
import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";
import img from "../assets/certified.png";
import delet from "../assets/delete.png";
import edit from "../assets/edit.png";
import { products } from "../helpers/data.types";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useProductContext from "../hooks/useProductContext";
import { modalContext } from "../context/ModalContext";

type Props = {
  productsProp: products[] | [];
};

const ProductCard = ({ productsProp }: Props) => {
  const { user } = useAuthContext();
  const { deleteProduct } = useProductContext();
  const navigate = useNavigate();
  const { modal, setModal, setShopId } = useContext(modalContext);

  const handleClick = (id: number): void => {
    setModal(!modal);
    setShopId(id);
    // deleteProduct(id);
  };

  return (
    <>
      {productsProp.map((item, index) => {
        return (
          <div
            key={index}
            className=" cursor-pointer w-60 h-80 border-none rounded-2xl shadow-xl bg-slate-100 hover:shadow-3xl ease-in hover:duration-150 mt-8"
          >
            <span onClick={(): void => navigate(`/product/${item.id}`)}>
              <div className="flex justify-center">
                <img
                  className="h-32 w-full rounded-t-2xl object-cover"
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
            {item.userId === user?.id || user?.role === "admin" ? (
              <div className="flex justify-between">
                <div className="flex ml-2">
                  {item.userId === user?.id ? (
                    <img
                      className="w-8 mx-1 hover:scale-110 active:translate-y-0.5 duration-75"
                      src={edit}
                      alt="edit"
                      onClick={(): void => navigate(`/editproduct/${item.id}`)}
                    />
                  ) : null}
                  <img
                    className="w-8 mx-1 hover:scale-110 active:translate-y-0.5 duration-75"
                    src={delet}
                    alt="delete"
                    onClick={() => handleClick(item.id)}
                  />
                </div>
                <div className="flex mr-2">
                  <FaInstagramSquare className="text-3xl mx-1" />
                  <FaWhatsappSquare className="text-3xl mx-1" />
                </div>
              </div>
            ) : (
              <div className="flex justify-end mr-2">
                <FaInstagramSquare className="text-3xl mx-1" />
                <FaWhatsappSquare className="text-3xl mx-1" />
              </div>
            )}
            {/* <div className="flex justify-between">
              <div className="flex ml-2">
                <img className="w-8 mx-1" src={edit} alt="edit" />
                <img className="w-8 mx-1" src={delet} alt="delete" />
              </div>
              <div className="flex mr-2">
                <FaInstagramSquare className="text-3xl mx-1" />
                <FaWhatsappSquare className="text-3xl mx-1" />
              </div>
            </div> */}
            {/* <div className="flex justify-end mr-2">
              <FaInstagramSquare className="text-3xl mx-1" />
              <FaWhatsappSquare className="text-3xl mx-1" />
            </div> */}
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
