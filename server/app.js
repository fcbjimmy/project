require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//extra packages/security packages
const cors = require("cors");
const sequelize = require("./db/database");

//db
require("./models/User");
require("./models/Product");

//middleware
const authRouter = require("./routes/userRoute");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//routes
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 4000;

//initialize server
const start = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
