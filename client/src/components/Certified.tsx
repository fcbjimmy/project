import React from "react";
import CertifiedLogo from "./CertifiedLogo";
import local from "../assets/star.png";
import certification from "../assets/esg.png";
import sustain from "../assets/eco-bag.png";
type Props = {};

const Certified = (props: Props) => {
  const criteria = [
    { name: "Local Brand", logo: local },
    { name: "ESG certified", logo: certification },
    { name: "Carbon Neutral", logo: sustain },
  ];
  return (
    <section className="mt-8">
      <h1 className="text-3xl text-forest font-bold text-center m-2">
        Shops are certified by the following criteria
      </h1>
      <div className="flex flex-col items-center md:grid md:grid-cols-3 justify-items-center">
        {criteria.map((item, index) => {
          return (
            <CertifiedLogo key={index} name={item.name} logo={item.logo} />
          );
        })}
      </div>
    </section>
  );
};

export default Certified;
