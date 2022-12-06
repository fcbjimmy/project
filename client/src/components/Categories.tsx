import React from "react";
import restau from "../assets/salad.png";
import shop from "../assets/shoppingbag.png";
import CatCard from "./CatCard";
import health from "../assets/cream.png";
import grocery from "../assets/groceries.png";
import other from "../assets/other.png";
import all from "../assets/all.png";

type Props = {};

const Categories = (props: Props) => {
  const cat = [
    { image: all, type: "All", link: "/allshops?cat=0" },
    { image: restau, type: "Restaurant", link: "/allshops?cat=1" },
    { image: shop, type: "Shopping", link: "/allshops?cat=2" },
    { image: health, type: "Health and Beauty", link: "/allshops?cat=3" },
    { image: grocery, type: "Grocery", link: "/allshops?cat=4" },
    { image: other, type: "Other", link: "/allshops?cat=5" },
  ];

  return (
    <section className="mt-8">
      <h1 className="text-3xl text-forest font-bold text-center m-2">
        Categories
      </h1>
      <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
      </div>
    </section>
  );
};

export default Categories;
