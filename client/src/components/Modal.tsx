import { useContext } from "react";
import useProductContext from "../hooks/useProductContext";
import { modalContext } from "../context/ModalContext";
import useAuthContext from "../hooks/useAuthContext";

type Props = {};

const Modal = (props: Props) => {
  const { user } = useAuthContext();
  const { deleteProduct, deleteProductByAdmin } = useProductContext();
  const { modal, setModal, setShopId, shopId } = useContext(modalContext);

  const confirmRemoveShopByAdmin = () => {
    if (shopId) {
      deleteProductByAdmin(shopId);
      setModal(!modal);
      setShopId(null);
    }
  };

  const confirmRemoveShop = () => {
    if (shopId) {
      deleteProduct(shopId);
      setModal(!modal);
      setShopId(null);
    }
  };

  return (
    <div className=" bg-zinc-200 opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col border-4 border-sky-500 py-12 px-20 bg-white rounded-md">
          <div className="text-zinc-800 mb-10 font-bold text-xl">
            Confirm to delete this Shop?
          </div>
          <div className="flex justify-between">
            <span
              className="span-button button-animation"
              onClick={
                user?.role === "admin"
                  ? confirmRemoveShopByAdmin
                  : confirmRemoveShop
              }
            >
              Yes
            </span>
            <span
              className="span-button button-animation"
              onClick={() => setModal(!modal)}
            >
              No
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
