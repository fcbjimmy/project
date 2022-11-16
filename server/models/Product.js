const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      max: 8,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sampleImageOne: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
    sampleImageTwo: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
  },
  { timestamps: true }
);

module.exports = Product;
