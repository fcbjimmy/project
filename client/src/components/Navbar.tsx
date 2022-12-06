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
      <nav className="w-screen h-[80px] z-10 fixed bg-green-50">
        <div className="px-2 flex justify-between items-center w-full h-full">
          <div className="flex items-center">
            <Link to={"/"} onClick={() => setNav(false)}>
              <h1 className="text-forest text-2xl font-bold mr-4 sm:text-4xl">
                SBHK
              </h1>
            </Link>
            <ul className="hidden md:flex">
              <Link to={"/about"}>
                <li className="p-4">About</li>
              </Link>
              <Link to={"/allshops"}>
                <li className="p-4">Shops</li>
              </Link>
              {user && (
                <Link to={"/usershops"}>
                  <li className="p-4">My Shops</li>
                </Link>
              )}
            </ul>
          </div>
          {!user ? (
            <div className="hidden md:flex pr-4">
              <button
                className="bg-transparent text-black hover:text-black border-none mx-2"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="px-2 py-3 mx-2"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-5">
              <span className="text-forest font-bold">Hello {user.name}</span>
              <div className="hidden md:flex pr-4">
                <button className="p-2" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          )}
          <div className="pr-4 text-2xl md:hidden" onClick={handleClick}>
            {!nav ? (
              <AiOutlineMenu className="text-3xl cursor-pointer active:translate-y-0.5 transition duration-150" />
            ) : (
              <GrClose className="text-3xl cursor-pointer active:translate-y-0.5 transition duration-150" />
            )}
          </div>
        </div>

        <ul className={!nav ? "hidden" : "absolute bg-green-50 w-full px-8"}>
          <Link to={"/"} onClick={() => setNav(!nav)}>
            <li className="menu-li">Home</li>
          </Link>
          <Link to={"/about"} onClick={() => setNav(!nav)}>
            <li className="menu-li">
              <span className="">About</span>
            </li>
          </Link>
          <Link to={"/allshops"} onClick={() => setNav(!nav)}>
            <li className="menu-li">Shops</li>
          </Link>
          {user && (
            <Link to={"/usershops"} onClick={() => setNav(!nav)}>
              <li className="menu-li">My Shops</li>
            </Link>
          )}
          {user ? (
            <div className="flex flex-col my-4 gap-4">
              <button
                onClick={() => {
                  logout();
                  setNav(!nav);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col my-4 gap-4">
              <button
                className="bg-transparent text-emerald-300"
                onClick={() => {
                  navigate("/login");
                  setNav(!nav);
                }}
              >
                Sign in
              </button>
              <button
                className="mb-4"
                onClick={() => {
                  navigate("/signup");
                  setNav(!nav);
                }}
              >
                Sign up
              </button>
            </div>
          )}
        </ul>
      </nav>
      <div className="w-screen h-[80px] bg-green-50"></div>
    </>
  );
};

export default Navbar;
