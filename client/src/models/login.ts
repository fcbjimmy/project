import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(5, "Password must be longer than 5 characters!")
    .required("Password is required!"),
});
