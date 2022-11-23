import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/signup";
import React, { useEffect, useState } from "react";
import { SignupFormInputs } from "../helpers/data.types";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

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
    <section>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h1>Sign up</h1>
        <ul>
          <li>
            <p>{errors.name?.message}</p>
            <label htmlFor="name">Name</label>
            <input
              {...register("name")}
              type="name"
              id="name"
              placeholder="name"
            />
          </li>
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
            <p>{errors.confirmPassword?.message}</p>
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="ConfirmPassword"
              placeholder="Confirm Password"
            />
          </li>
          <li>
            <button type="submit">Sign up</button>
          </li>
          <li>
            <p>
              Already a member? <Link to="/login">Log in</Link>
            </p>
          </li>
        </ul>
      </form>
    </section>
  );
};

export default Signup;
