import React from "react";

type Props = {
  name: string;
  logo: string;
};

const CertifiedLogo = ({ name, logo }: Props) => {
  return (
    <div className="flex flex-col m-3 w-[12rem] items-center">
      <img className="w-[8rem] mt-2" src={logo} alt="/" />
      <div className="mt-3 text-2xl text-forest font-bold">{name}</div>
    </div>
  );
};

export default CertifiedLogo;
