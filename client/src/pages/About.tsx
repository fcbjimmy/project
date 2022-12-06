import React from "react";
import img2 from "../assets/employee.png";
import { motion } from "framer-motion";

type Props = {};

const About = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <section className="w-full min-h-full flex justify-center">
        <div className="flex flex-col  max-w-[23rem] md:max-w-xl mt-10 lg:max-w-3xl text-forestGreen">
          <div className="text-2xl font-bold">About SBHK 🌏</div>
          <div className="mt-8 font-bold text-justify ">
            SBHK stands for Sustainable Hong Kong. Why sustainability?
            Sustainability doesn't just refer to protecting the future of our
            planet against climate change. It is an all-encompassing concept
            concerned with ensuring the continuity of quality, access and
            opportunity in all areas of life for future generations.
          </div>
          <div className="mt-8 text-justify font-extrabold text-forestGreen">
            Looking to take a step towards zero-waste living? It can be as
            simple as refusing plastic bags, carrying a reusable bottle with
            you, and making the effort to shop at places that limit the amount
            of plastic packaging you take home. With a number of zero waste
            stores now dotted around the city housing refill stations for pantry
            staples, washing up liquids, plastic-free beauty products and more,
            it's easier than ever to be an eco-conscious shopper in Hong Kong.
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl mt-8 font-bold">About me</h1>
            <div className="flex flex-col">
              <img
                className="w-44 md:w-64 mt-6 self-start mx-auto"
                src={img2}
                alt="/"
              />
              <div className="my-8 text-justify font-bold">
                My name is Jimmy and I am an aspiring front-end developer. As I
                graduated with a Bachelor of Science in Environmetal and
                Sustainable Development, I wanted to make a project related to
                my studies. So, I believe promoting local Environmental
                Sustainable shops will be a good start and a good way to promote
                moving to a plastic-free lifestyle, as a result, everyone can do
                their bit to help protect the environment.
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
