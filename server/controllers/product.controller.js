const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error");

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
  } = req.body;

  if (
    !name ||
    !address ||
    !phone ||
    !website ||
    !email ||
    !description ||
    !type ||
    !logo ||
    !cover
  ) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const validName = await Product.findOne({ where: { name } });
  if (validName) {
    throw new CustomError.BadRequestError("Name has already been used");
  }

  const product = await Product.create({
    name,
    address,
    phone,
    website,
    email,
    description,
    type,
    logo,
    cover,
    userId: req.user.userId,
  });
  res.status(StatusCodes.OK).json({ msg: "Project created" });
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
  } = req.body;

  if (
    name === "" ||
    address === "" ||
    phone === "" ||
    website === "" ||
    email === "" ||
    description === "" ||
    type === "" ||
    logo === "" ||
    cover === ""
  ) {
    throw new CustomError.BadRequestError("Required fields cannot be empty");
  }

  const validName = await Product.findOne({ where: { name } });
  if (validName) {
    throw new CustomError.BadRequestError("Name has already been used");
  }

  const product = await Product.findByPk(id);

  if (!product) {
    throw new CustomError.BadRequestError("Not found");
  }
  product.name = name;
  product.address = address;
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

module.exports = {
  createProduct,
  getAllProductsFromUser,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
