const User = require("../models/User");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error");
const { createJWT } = require("../utils/jwt");
const { comparePassword } = require("../utils/comparePassword");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const validEmail = await User.findOne({ where: { email } });
  if (validEmail) {
    throw new CustomError.BadRequestError("Please use another email");
  }
  const salt = await bcrypt.genSalt(10);
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, salt),
  });
  const token = createJWT(user);
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new CustomError.UnauthenticatedError(`No user with email ${email}`);
  }
  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    throw new CustomError.UnauthenticatedError("Password does not match");
  }

  const token = createJWT(user);
  res.status(StatusCodes.OK).json({ user: { name: user.name, email }, token });
};

const logout = async (req, res) => {
  res.send("logout");
};
module.exports = { signup, login, logout };
