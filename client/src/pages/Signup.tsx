import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/signup";
import React, { useEffect, useState } from "react";
import { SignupFormInputs } from "../helpers/data.types";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi";
import "../styles/registration.css";
import { motion } from "framer-motion";

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignupFormInputs>({ resolver: yupResolver(schema) });
  const { dispatch, login, signup, logout } = useAuthContext();

  const onSubmitHandler = (data: SignupFormInputs) => {
    signup(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <section>
        <div className="container-form">
          <div>
            <BiLockAlt className="form-react-icon" />
          </div>
          <div className="w-[370px] md:w-[450px] h-[50vh]">
            <form
              className="flex flex-col h-full"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <h1 className="form-h1">Sign up</h1>
              <ul>
                <li className="flex flex-col">
                  <p className="form-error">{errors.name?.message}</p>
                  <label htmlFor="name">Name</label>
                  <input
                    className="reg-form-input"
                    {...register("name")}
                    type="name"
                    id="name"
                    placeholder="Name"
                  />
                </li>
                <li className="flex flex-col">
                  <p className="form-error">{errors.email?.message}</p>
                  <label htmlFor="email">Email</label>
                  <input
                    className="reg-form-input"
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </li>
                <li className="flex flex-col">
                  <p className="form-error">{errors.password?.message}</p>
                  <label htmlFor="password">Password</label>
                  <input
                    className="reg-form-input"
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                </li>
                <li className="flex flex-col">
                  <p className="form-error">
                    {errors.confirmPassword?.message}
                  </p>
                  <label htmlFor="ConfirmPassword">Confirm Password</label>
                  <input
                    className="reg-form-input"
                    {...register("confirmPassword")}
                    type="password"
                    id="ConfirmPassword"
                    placeholder="Confirm Password"
                  />
                </li>
                <li className="flex flex-col">
                  <button className="reg-form-button" type="submit">
                    Sign up
                  </button>
                </li>
                <li>
                  <p>
                    Already a member?{" "}
                    <Link to="/login">
                      <span className="text-emerald-500">Sign in 🙌</span>
                    </Link>
                  </p>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Signup;
