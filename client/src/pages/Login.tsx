import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/login";
import React, { useEffect, useState } from "react";
import { LoginFormInputs } from "../helpers/data.types";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const { login } = useAuthContext();

  const onSubmitHandler = (data: LoginFormInputs) => {
    console.log(data);
    login(data);
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
            <CgProfile className="form-react-icon" />
          </div>
          <div className="container-form-inputs">
            <form
              className="flex flex-col h-full"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <h1 className="form-h1">Sign in into your account</h1>
              <ul>
                <li className="flex flex-col">
                  <p className="form-error">{errors.email?.message}</p>
                  <label className="hidden" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="reg-form-input"
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="Email address"
                  />
                </li>
                <li className="flex flex-col">
                  <p className="form-error">{errors.password?.message}</p>
                  <label className="hidden" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="reg-form-input"
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                </li>
                <li className="flex flex-col">
                  <button className="reg-form-button" type="submit">
                    Sign in
                  </button>
                </li>
                <li>
                  <p>
                    Not a member?{" "}
                    <Link to="/signup">
                      <span className="text-emerald-500">Sign up 🙌</span>
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

export default Login;
