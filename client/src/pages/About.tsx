import React from "react";
import img2 from "../assets/employee.png";

type Props = {};

const About = (props: Props) => {
  return (
    <section className="w-full h-[91.4vh] flex">
      <div className="flex flex-col max-w-[23rem] md:max-w-xl">
        <div>About SBHK</div>
        <div>
          SBHK stands for Sustainable Hong Kong. Why sustainability?
          Sustainability doesn't just refer to protecting the future of our
          planet against climate change. It is an all-encompassing concept
          concerned with ensuring the continuity of quality, access and
          opportunity in all areas of life for future generations.
        </div>
        <div className="flex flex-col">
          <h1>About me</h1>
          <div>
            <img className="w-40 md:w-80" src={img2} alt="/" />
            <div>My name is Jimmy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
