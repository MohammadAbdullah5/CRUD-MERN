const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const Template = require("./../template");
const connectDB = require("./../database/connect.js");
const userRoutes = require("./../routes/userRoutes");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
connectDB();

app.use("/", userRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
  res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
  res.status(400).json({"error" : err.name + ": " + err.message})
  console.log(err)
  }
 })

app.get("/", (req, res) => {
  res.status(200).send(Template());
});



module.exports = app;
