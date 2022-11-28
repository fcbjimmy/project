import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/create";
import React, { useEffect, useState } from "react";
import { CreateProductInputs } from "../helpers/data.types";
import useAuthContext from "../hooks/useAuthContext";
import useProductContext from "../hooks/useProductContext";
import { Link } from "react-router-dom";

// interface fileImage {
//   lastModified: number;
//   lastModifiedDate?: {};
//   name: string;
//   size: number;
//   type: string;
//   webkitRelativePath: string;
// }

const CreateProducts = () => {
  const { createProduct } = useProductContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateProductInputs>({ resolver: yupResolver(schema) });
  // const [file, setFile] = useState<fileImage | null>(null);
  // const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [cover, setCover] = useState<string | ArrayBuffer | null>(null);
  const [logo, setLogo] = useState<string | ArrayBuffer | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files !== null) {
      file = e.target.files[0];
    }
    // if (file !== undefined) {
    //   const filePreview = URL.createObjectURL(file);
    //   setPreview(filePreview);
    // }
    setFileToBase64(file);
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files !== null) {
      file = e.target.files[0];
    }
    // if (file !== undefined) {
    //   const filePreview = URL.createObjectURL(file);
    //   setPreview(filePreview);
    // }
    setFileToBase64Logo(file);
  };

  const setFileToBase64 = (file: File | undefined) => {
    const reader = new FileReader();
    if (file !== undefined) reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCover(reader.result);
    };
  };

  const setFileToBase64Logo = (file: File | undefined) => {
    const reader = new FileReader();
    if (file !== undefined) reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogo(reader.result);
    };
  };

  const onSubmitHandler = (data: CreateProductInputs) => {
    const { address, description, email, name, phone, type, website } = data;
    const formData = {
      address,
      description,
      email,
      name,
      phone,
      type,
      website,
      cover,
      logo,
    };
    createProduct(formData);
    reset();
  };

  // const handleChange = (e: any) => {
  //   // console.log(e.target.files[0]);
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   const filePreview = URL.createObjectURL(selectedFile);
  //   setPreview(filePreview);
  //   console.log(selectedFile);
  // };

  return (
    <>
      <section className="border-2">
        {/* {preview && typeof preview !== ArrayBuffer ? (
          <img src={preview} alt="hello" />
        ) : (
          ""
        )} */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h1>Create Product</h1>
          <ul>
            <li>
              <p>{errors.name?.message}</p>
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Name"
              />
            </li>
            <li>
              <p>{errors.description?.message}</p>
              <label htmlFor="description">Description</label>
              <input
                {...register("description")}
                type="text"
                id="description"
                placeholder="Description"
              />
            </li>
            <li>
              <p>{errors.phone?.message}</p>
              <label htmlFor="phone">Phone</label>
              <input
                {...register("phone")}
                type="number"
                id="phone"
                placeholder="phone"
              />
            </li>
            <li>
              <p>{errors.address?.message}</p>
              <label htmlFor="address">Address</label>
              <input
                {...register("address")}
                type="text"
                id="address"
                placeholder="address"
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
              <p>{errors.website?.message}</p>
              <label htmlFor="website">Website</label>
              <input
                {...register("website")}
                type="text"
                id="website"
                placeholder="Website"
              />
            </li>
            <li>
              <select {...register("type")}>
                <option value="Restaurant">Restaurant</option>
                <option value="Shopping">Shopping</option>
                <option value="Health and Beauty">Health and Beauty</option>
                <option value="Grocery">Grocery</option>
                <option value="other">other</option>
              </select>
            </li>
            <li>
              <div>
                <label htmlFor="fileUploadLogo">Select Image for Logo..</label>
              </div>
              <input
                accept="image/png, image/jpeg"
                type="file"
                id="fileUploadLogo"
                onChange={handleLogo}
                required
              />
              <div>
                <button>upload</button>
              </div>
            </li>
            <li>
              <div>
                <label htmlFor="fileupload">Select Image for Cover..</label>
              </div>
              <input
                accept="image/png, image/jpeg"
                type="file"
                id="fileupload"
                onChange={handleImage}
                required
              />
            </li>
            <li>
              <button className="border-2 border-sky-500" type="submit">
                Create
              </button>
            </li>
          </ul>
        </form>
      </section>
    </>
  );
};

export default CreateProducts;
