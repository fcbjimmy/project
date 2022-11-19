import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/signup";
import React, { useEffect, useState } from "react";
import { string } from "yup/lib/locale";

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: FormInputs) => {
    console.log(data);
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
        </ul>
      </form>
    </section>
  );
};

export default Signup;
