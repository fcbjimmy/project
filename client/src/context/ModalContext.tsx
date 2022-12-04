import { createContext, ReactNode, useState } from "react";
import { id } from "../helpers/data.types";

interface Props {
  children: ReactNode;
}

export const modalContext = createContext<{
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  shopId: number | null;
  setShopId: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  modal: false,
  setModal: (boolean) => {},
  shopId: null,
  setShopId: (number) => {},
});

export const ModalContextProvider = ({ children }: Props) => {
  const [modal, setModal] = useState<true | false>(false);
  const [shopId, setShopId] = useState<number | null>(null);

  const contextValue = { modal, setModal, shopId, setShopId };

  return (
    <modalContext.Provider value={contextValue}>
      {children}
    </modalContext.Provider>
  );
};
