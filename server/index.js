const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
let Adult = require("./model");
const router = require("./auth");
const passport = require("passport");
const session = require("express-session");

const PORT = 4000;

const uri = "mongodb://127.0.0.1:27017/capstone";
//database integration
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));

//mongoose.connect(uri, (err, db) => {});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

app.use(
  session({
    secret:
  })
)

//logging middelware
app.use(cors());

//bodyparsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//mounting router(boilermaker)
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.use("/", (req, res, next) => {
  res.send("hello world");
});
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
