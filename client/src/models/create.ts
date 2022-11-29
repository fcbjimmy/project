import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters long")
    .max(32)
    .required(),
  address: yup.string().max(90).required("Address is required!"),
  location: yup.string().required("Location is required!"),
  phone: yup
    .string()
    .min(8, "min 8 digits")
    .typeError("Amount must be a number and min 8 digits")
    .required("Number is required!"),
  website: yup.string().default(""),
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  description: yup
    .string()
    .min(4, "Name must be at least 4 characters long")
    .max(32)
    .required(),
  type: yup.string().required(),
  instagram: yup.string().required(),
  facebook: yup.string().required(),
});
