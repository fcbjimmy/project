require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//extra packages/security packages
const cors = require("cors");

//db

//middleware
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//routes
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(notFound);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 4000;

//initialize server
const start = async () => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
