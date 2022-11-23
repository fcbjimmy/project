const User = require("../models/User");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error");
const { createJWT } = require("../utils/jwt");
const { comparePasswords } = require("../utils/comparePassword");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const validEmail = await User.findOne({ where: { email } });
  if (validEmail) {
    throw new CustomError.BadRequestError("Please use another email");
  }

  const salt = await bcrypt.genSalt(10);

  let data = { name, email, password: await bcrypt.hash(password, salt) };

  const count = await User.count();
  if (count === 0) {
    data = { ...data, role: "admin" };
  }

  const user = await User.create(data);

  const token = createJWT(user);

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email, role: user.role }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new CustomError.UnauthenticatedError(`No user with email ${email}`);
  }
  const validPassword = await comparePasswords(password, user.password);
  if (!validPassword) {
    throw new CustomError.UnauthenticatedError("Password does not match");
  }

  const token = createJWT(user);
  res.status(StatusCodes.OK).json({
    user: { name: user.name, email, role: user.role, id: user.id },
    token,
  });
};

const logout = async (req, res) => {
  res.send("logout");
};

const showCurrentUser = async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  if (!user) {
    throw new CustomError.UnauthenticatedError(
      "Invalid User, please login again"
    );
  }
  console.log(user);
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    },
  });
};

const showAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.status(StatusCodes.OK).json({ products });
};

module.exports = { signup, login, logout, showCurrentUser, showAllProducts };
