import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/login";
import React, { useEffect, useState } from "react";
import { LoginFormInputs } from "../helpers/data.types";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

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
    <section className="border-2">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h1>Login</h1>
        <ul>
          <li>
            <p>{errors.email?.message}</p>
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="email"
            />
          </li>
          <li>
            <p>{errors.password?.message}</p>
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="password"
            />
          </li>
          <li>
            <button className="border-2 border-sky-500" type="submit">
              Login
            </button>
          </li>
          <li>
            <p>
              Not a member? <Link to="/signup">Sign up</Link>
            </p>
          </li>
        </ul>
      </form>
    </section>
  );
};

export default Login;
