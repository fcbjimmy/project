import React from "react";
import img from "../assets/quality.png";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

type Props = {};

const Hero = (props: Props) => {
  const { user } = useAuthContext();
  return (
    <section className="w-screen h-[30rem] bg-green-50 rounded-lg">
      <div className="flex flex-col items-center justify-start md:flex-row md:justify-center md:items-center h-[30rem] md:gap-20 lg:gap-48">
        <div className="order-1 md:order-none mt-8 flex flex-col max-w-[23rem] min-h-[10rem] md:max-w-[26rem]">
          <h1 className="text-2xl md:text-3xl font-bold text-forest">
            Hello! Welcome to SBHK 🌍 🇭🇰
          </h1>
          <span className="text-lg text-forest mt-5">
            In here you can promote your eco-friendly shops for everyone who
            loves the planet!
          </span>
          {user ? (
            <Link to={"/create"}>
              <div className="hero-join-button button-animation">Join</div>
            </Link>
          ) : (
            <Link to={"/signup"}>
              <div className="hero-join-button button-animation">Join</div>
            </Link>
          )}
        </div>
        <img
          className="w-[12rem] md:w-[12rem] lg:w-80 mt-5"
          src={img}
          alt="/"
        />
      </div>
    </section>
  );
};

export default Hero;
