import { useEffect, useState } from "react";
import useProductContext from "../hooks/useProductContext";
import useAuthContext from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../models/create";
import { EditProductInputs, products } from "../helpers/data.types";
import { locations, types } from "../helpers/options";
import { SampleProduct } from "../components";
import { useNavigate } from "react-router-dom";

type Props = {};

const EditProduct = (props: Props) => {
  const { fetchUserProducts, userProducts, editProduct } = useProductContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const shopId: number = parseInt(id ? id : "");
  const shop = userProducts.find((item) => item.id === shopId);
  const navigate = useNavigate();
  // useEffect(() => {}, [userProducts]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<EditProductInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: shop?.name,
      type: shop?.type,
      location: shop?.location,
      description: shop?.description,
      phone: shop?.phone,
      address: shop?.address,
      email: shop?.email,
      website: shop?.website,
      instagram: shop?.instagram,
      facebook: shop?.facebook,
    },
  });

  const [preview, setPreview] = useState<string>(shop ? shop.cover : "");
  const [cover, setCover] = useState<string | ArrayBuffer | null>(
    shop ? shop.cover : ""
  );
  const [logo, setLogo] = useState<string | ArrayBuffer | null>(
    shop ? shop.logo : ""
  );
  const [sampleImageOne, setSampleImageOne] = useState<
    string | ArrayBuffer | null
  >(shop ? shop.sampleImageOne : "");
  const [sampleImageTwo, setSampleImageTwo] = useState<
    string | ArrayBuffer | null
  >(shop ? shop.sampleImageTwo : "");

  const data = watch(["name", "type", "location"]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    let filePreview;
    if (e.target.files !== null) {
      file = e.target.files[0];
      filePreview = URL.createObjectURL(e.target.files[0]);
      setPreview(filePreview);
    }
    setFileToBase64(file);
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files !== null) {
      file = e.target.files[0];
    }
    setFileToBase64Logo(file);
  };

  const handleSampleImageOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files !== null) {
      file = e.target.files[0];
    }
    // console.log(file, "handleSampleImageOne");
    setFileToBase64ImageOne(file);
  };

  const handleSampleImageTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files !== null) {
      file = e.target.files[0];
    }
    // console.log(file, "handleSampleImageTwo");
    setFileToBase64ImageTwo(file);
  };

  //set to base64

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

  const setFileToBase64ImageOne = (file: File | undefined) => {
    const reader = new FileReader();
    if (file !== undefined) reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSampleImageOne(reader.result);
    };
  };

  const setFileToBase64ImageTwo = (file: File | undefined) => {
    const reader = new FileReader();
    if (file !== undefined) reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSampleImageTwo(reader.result);
    };
  };

  const onSubmitHandler = (data: EditProductInputs) => {
    const {
      name,
      description,
      phone,
      address,
      email,
      website,
      instagram,
      facebook,
      type,
      location,
    } = data;
    const formData = {
      name,
      description,
      phone,
      address,
      email,
      website,
      instagram,
      facebook,
      type,
      location,
      cover,
      logo,
      sampleImageOne,
      sampleImageTwo,
    };
    editProduct(formData, shopId);
  };

  return (
    <>
      <section className="border-2">
        <div className="flex flex-col items-center md:flex-row md:justify-evenly border border-red-100 max-w-full">
          <div className="m-10 bg-white rounded-md drop-shadow-md w-[375px] md:w-[450px]">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <h1 className="mx-4 mt-3 font-bold">Edit Shop 📝</h1>
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
                      Select Image for Logo{" "}
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
                  />
                </li>
                <li className="form-li-create">
                  <div>
                    <label htmlFor="fileupload">
                      Select Image for Cover
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
                  />
                </li>
                <li className="form-li-create">
                  <div>
                    <label htmlFor="fileupload">
                      Select Image for Sample Image no. 1
                      <span className="text-xs">
                        (images to be less than 100kb)
                      </span>
                    </label>
                  </div>
                  <input
                    accept="image/png, image/jpeg"
                    type="file"
                    id="fileupload"
                    onChange={handleSampleImageOne}
                  />
                </li>
                <li className="form-li-create">
                  <div>
                    <label htmlFor="fileupload">
                      Select Image for Sample Image no. 2
                      <span className="text-xs">
                        (images to be less than 100kb)
                      </span>
                    </label>
                  </div>
                  <input
                    accept="image/png, image/jpeg"
                    type="file"
                    id="fileupload"
                    onChange={handleSampleImageTwo}
                  />
                </li>
                <li className="m-2 flex justify-end">
                  <button className="bg-emerald-500 mx-2" type="submit">
                    Confirm
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
    </>
  );
};

export default EditProduct;
