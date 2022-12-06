import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/create";
import React, { useState } from "react";
import { CreateProductInputs } from "../helpers/data.types";
import useProductContext from "../hooks/useProductContext";
import { locations, types } from "../helpers/options";
import { SampleProduct } from "../components";
import { motion } from "framer-motion";

const CreateProducts = () => {
  const { createProduct, userProducts } = useProductContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreateProductInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "",
      location: "",
    },
  });
  // const [file, setFile] = useState<fileImage | null>(null);
  const [preview, setPreview] = useState<string>(
    "https://res.cloudinary.com/dp5axfdaj/image/upload/v1668699843/cld-sample-5.jpg"
  );
  const [cover, setCover] = useState<string | ArrayBuffer | null>(null);
  const [logo, setLogo] = useState<string | ArrayBuffer | null>(null);

  // const sampleName = watch("name");
  // const sampleType = watch("type");
  // const sampleLocation = watch("location");
  // console.log(sampleName);
  // console.log(sampleType);
  // console.log(sampleLocation);
  console.log(userProducts);

  const data = watch(["name", "type", "location"]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    let filePreview;
    if (e.target.files !== null) {
      file = e.target.files[0];
      filePreview = URL.createObjectURL(e.target.files[0]);
      setPreview(filePreview);
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
    const {
      address,
      description,
      email,
      name,
      phone,
      type,
      website,
      location,
      instagram,
      facebook,
    } = data;
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
      location,
      instagram,
      facebook,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <section className="border-2">
        <div className="flex flex-col items-center md:flex-row md:justify-evenly border max-w-full">
          <div className="m-10 bg-white rounded-md drop-shadow-md w-[375px] md:w-[450px]">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <h1 className="mx-4 mt-3 font-bold">Create Shop 🍃</h1>
              <ul>
                <li className="form-li-create">
                  <label htmlFor="name">
                    Name* <p className="form-error">{errors.name?.message}</p>
                  </label>
                  <input
                    className="form-li-create-input"
                    {...register("name")}
                    type="text"
                    id="name"
                    placeholder="Name"
                  />
                </li>
                <li className="form-li-create">
                  <label htmlFor="description">
                    Description*
                    <p className="form-error">{errors.description?.message}</p>
                  </label>
                  <input
                    className="form-li-create-input"
                    {...register("description")}
                    type="text"
                    id="description"
                    placeholder="Description"
                  />
                </li>
                <li className="form-li-create">
                  <p>{errors.phone?.message}</p>
                  <label htmlFor="phone">Phone*</label>
                  <input
                    className="form-li-create-input"
                    {...register("phone")}
                    type="number"
                    id="phone"
                    placeholder="Phone"
                  />
                </li>
                <li className="form-li-create">
                  <p>{errors.address?.message}</p>
                  <label htmlFor="address">Address*</label>
                  <input
                    className="form-li-create-input"
                    {...register("address")}
                    type="text"
                    id="address"
                    placeholder="address"
                  />
                </li>
                <li className="form-li-create">
                  <p>{errors.email?.message}</p>
                  <label htmlFor="email">Email*</label>
                  <input
                    className="form-li-create-input"
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="email"
                  />
                </li>
                <li className="form-li-create">
                  <p>{errors.website?.message}</p>
                  <label htmlFor="website">Website</label>
                  <input
                    className="form-li-create-input"
                    {...register("website")}
                    type="text"
                    id="website"
                    placeholder="Website"
                  />
                </li>
                <li className="form-li-create">
                  <p>{errors.instagram?.message}</p>
                  <label htmlFor="instagram">Instagram</label>
                  <input
                    className="form-li-create-input"
                    {...register("instagram")}
                    type="text"
                    id="instagram"
                    placeholder="Instagram"
                  />
                </li>
                <li className="form-li-create">
                  <p>{errors.facebook?.message}</p>
                  <label htmlFor="facebook">Facebook</label>
                  <input
                    className="form-li-create-input"
                    {...register("facebook")}
                    type="text"
                    id="facebook"
                    placeholder="Facebook"
                  />
                </li>
                <li className="form-li-create">
                  <div>
                    <label htmlFor="type">Choose Type</label>
                  </div>
                  <select
                    className="form-li-create-input"
                    id="type"
                    {...register("type")}
                  >
                    {types.map((type, index) => {
                      return (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className="form-li-create">
                  <div>
                    <label htmlFor="location">Choose Location</label>
                  </div>
                  <select
                    className="form-li-create-input"
                    id="location"
                    {...register("location")}
                  >
                    {locations.map((location, index) => {
                      if (location === "--Kowloon--") {
                        return (
                          <option disabled key={index} value={location}>
                            {location}
                          </option>
                        );
                      } else if (location === "--Hong Kong Island--") {
                        return (
                          <option disabled key={index} value={location}>
                            {location}
                          </option>
                        );
                      } else if (location === "--New Territories--") {
                        return (
                          <option disabled key={index} value={location}>
                            {location}
                          </option>
                        );
                      }
                      return (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className="form-li-create">
                  <div>
                    <label htmlFor="fileUploadLogo">
                      Select Image for front page
                      <span className="text-xs">
                        (images to be less than 100kb)
                      </span>
                    </label>
                  </div>
                  <input
                    accept="image/png, image/jpeg"
                    type="file"
                    id="fileUploadLogo"
                    onChange={handleLogo}
                    required
                  />
                </li>
                <li className="form-li-create">
                  <div>
                    <label htmlFor="fileupload">
                      Select Image for card logo
                      <span className="text-xs">
                        (images to be less than 100kb)
                      </span>
                    </label>
                  </div>
                  <input
                    accept="image/png, image/jpeg"
                    type="file"
                    id="fileupload"
                    onChange={handleImage}
                    required
                  />
                </li>
                <li className="m-2 flex justify-end">
                  <button className="bg-emerald-500 mx-2" type="submit">
                    Create
                  </button>
                </li>
              </ul>
            </form>
          </div>
          <div>
            <h1 className="text-center my-5">Sample Card</h1>
            <SampleProduct
              name={data[0]}
              type={data[1]}
              location={data[2]}
              cover={preview}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CreateProducts;
