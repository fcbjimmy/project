import React from "react";
import restau from "../assets/salad.png";
import shop from "../assets/shoppingbag.png";
import CatCard from "./CatCard";

type Props = {};

const Categories = (props: Props) => {
  const cat = [
    { image: restau, type: "Restaurant", link: "/allshops?cat=1" },
    { image: shop, type: "Shopping", link: "/allshops?cat=2" },
  ];

  return (
    <section>
      {cat.map((item, index) => {
        return (
          <CatCard
            key={index}
            image={item.image}
            type={item.type}
            link={item.link}
          />
        );
      })}
    </section>
  );
};

export default Categories;
