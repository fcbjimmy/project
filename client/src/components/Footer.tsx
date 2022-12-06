import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-zinc-100 w-screen">
      <div className="flex justify-center mt-5 gap-2">
        <h6 className="font-forest">©2022 SBHK</h6>
        <a
          href="https://www.linkedin.com/in/jimmychan11/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin className="text-2xl" />
        </a>
        <a href="https://github.com/fcbjimmy/project">
          <AiFillGithub className="text-2xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
