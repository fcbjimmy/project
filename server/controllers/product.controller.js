const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res) => {
  const {
    name,
    address,
    phone,
    website,
    email,
    description,
    type,
    logo,
    cover,
    location,
  } = req.body;

  if (
    !name ||
    !address ||
    !phone ||
    !email ||
    !description ||
    !type ||
    !location
    // !logo ||
    // !cover
  ) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const validName = await Product.findOne({ where: { name } });
  if (validName) {
    throw new CustomError.BadRequestError("Name has already been used");
  }

  const resultCover = await cloudinary.uploader.upload(cover, {
    use_filename: true,
    folder: "file-upload-zero",
  });

  const resultLogo = await cloudinary.uploader.upload(logo, {
    use_filename: true,
    folder: "file-upload-zero",
  });

  console.log(resultCover);
  console.log(resultLogo);

  const product = await Product.create({
    name,
    address,
    phone,
    website,
    email,
    description,
    type,
    location,
    logo: resultLogo.secure_url,
    cover: resultCover.secure_url,
    userId: req.user.userId,
  });

  console.log(product);
  res.status(StatusCodes.OK).json({ product, msg: "Project created" });
};

const getAllProductsFromUser = async (req, res) => {
  const products = await Product.findAll({
    where: { userId: req.user.userId },
  });
  res.status(StatusCodes.ACCEPTED).json(products);
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id, userId: req.user.userId },
  });
  if (!product) {
    throw new CustomError.BadRequestError("Not found");
  }

  res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    address,
    phone,
    website,
    email,
    description,
    type,
    logo,
    cover,
    location,
  } = req.body;

  if (
    name === "" ||
    address === "" ||
    phone === "" ||
    email === "" ||
    description === "" ||
    type === "" ||
    location == "" ||
    logo === "" ||
    cover === ""
  ) {
    throw new CustomError.BadRequestError("Required fields cannot be empty");
  }

  const product = await Product.findByPk(id);

  if (!product) {
    throw new CustomError.BadRequestError("Not found");
  }

  if (product.userId !== req.user.userId) {
    throw new CustomError.UnauthenticatedError("No access");
  }

  product.name = name;
  product.address = address;
  product.location = location;
  product.phone = phone;
  product.website = website;
  product.email = email;
  product.description = description;
  product.type = type;
  product.logo = logo;
  product.cover = cover;
  await product.save();
  res.status(StatusCodes.OK).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: { id, userId: req.user.userId },
  });
  if (!product) {
    throw new CustomError.BadRequestError("Not found");
  }

  await Product.destroy({
    where: { id, userId: req.user.userId },
  });
  res.status(StatusCodes.ACCEPTED).json({ msg: "Product deleted" });
};

const adminDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(req.user.userId);
  if (user.role !== "admin") {
    throw new CustomError.BadRequestError("No access");
  }

  const product = await Product.findOne({
    where: { id },
  });
  if (!product) {
    throw new CustomError.BadRequestError("Not found");
  }

  await Product.destroy({
    where: { id },
  });
  res.status(StatusCodes.ACCEPTED).json({ msg: "Product deleted" });
};

module.exports = {
  createProduct,
  getAllProductsFromUser,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  adminDeleteProduct,
};
