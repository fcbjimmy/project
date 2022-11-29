import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import useWindowSize from "../hooks/useWindowSize";
import useAuthContext from "../hooks/useAuthContext";

type Props = {};

const Navbar = (props: Props) => {
  const [nav, setNav] = useState<true | false>(false);
  const { user, logout } = useAuthContext();
  const width = useWindowSize();
  const handleClick = () => setNav(!nav);
  const navigate = useNavigate();

  useEffect(() => {
    if (width >= 768) {
      setNav(false);
    }
  }, [width]);

  return (
    <>
      <nav className="w-screen h-[80px] z-10 fixed bg-green-50 drop-shadow-lg">
        <div className="px-2 flex justify-between items-center w-full h-full">
          <div className="flex items-center">
            <Link to={"/"}>
              <h1 className="text-3xl font-bold mr-4 sm:text-4xl">
                HK S-Shops
              </h1>
            </Link>
            <ul className="hidden md:flex">
              <Link to={"/about"}>
                <li className="p-4">About</li>
              </Link>
              <li className="p-4">Shops</li>
              {user && (
                <Link to={"/userProducts"}>
                  <li className="p-4">My Shops</li>
                </Link>
              )}
            </ul>
          </div>
          {!user ? (
            <div className="hidden md:flex pr-4">
              <button
                className="bg-transparent text-black hover:text-black border-none"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button className="px-2 py-3" onClick={() => navigate("/signup")}>
                Sign up
              </button>
            </div>
          ) : (
            <div className="hidden md:flex pr-4">
              {" "}
              <button onClick={logout}>Logout</button>
            </div>
          )}
          <div className="pr-4 text-2xl md:hidden" onClick={handleClick}>
            {!nav ? (
              <AiOutlineMenu className="cursor-pointer active:translate-y-0.5 transition duration-150" />
            ) : (
              <GrClose className="cursor-pointer active:translate-y-0.5 transition duration-150" />
            )}
          </div>
        </div>

        <ul className={!nav ? "hidden" : "absolute bg-green-50 w-full px-8"}>
          <li className="border-b-2 border-b-emerald-200">Home</li>
          <li className="border-b-2 border-b-emerald-200">About</li>
          <li className="border-b-2 border-b-emerald-200">Shops</li>
          <li className="border-b-2 border-b-emerald-200">My Shops</li>
          <div className="flex flex-col my-4 gap-4">
            <button className="bg-transparent text-emerald-300 ">Log in</button>
            <button className="mb-4">Sign up</button>
          </div>
        </ul>
      </nav>
      <div className="w-screen h-[80px]"></div>
    </>
  );
};

export default Navbar;
