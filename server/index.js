const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
let Adult = require("./model");
const router = require("./auth");
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

mongoose.connect(uri, (err, db) => {
  // const user = new Adult({
  //   firstName: 'Andrea',
  //   lastName: 'Crabtree',
  //   email: 'andrea@email.com',
  //   child: [
  //     {
  //       firstName: 'Ben',
  //       avatar: undefined,
  //       totalPoints: undefined,
  //       dailyPoints: undefined,
  //     },
  //     {
  //       firstName: 'Julie',
  //       avatar: undefined,
  //       totalPoints: undefined,
  //       dailyPoints: undefined,
  //     },
  //   ],
  // });
  // const user2 = new Adult({
  //   firstName: 'Myra',
  //   lastName: 'Kahn',
  //   email: 'myra@email.com',
  //   child: [
  //     {
  //       firstName: 'Maggie',
  //       avatar: undefined,
  //       totalPoints: undefined,
  //       dailyPoints: undefined,
  //     },
  //     {
  //       firstName: 'Sarah',
  //       avatar: undefined,
  //       totalPoints: undefined,
  //       dailyPoints: undefined,
  //     },
  //   ],
  // });
  // user.save();
  // user2.save();
  //************************* */
  // db.collection('adults').insertMany([
  //   {
  //     firstName: 'Andrea',
  //     lastName: 'Crabtree',
  //     email: 'andrea@email.com',
  //     child: [{ firstName: 'Ben' }],
  //   },
  //   {
  //     firstName: 'Myra',
  //     lastName: 'Kahn',
  //     email: 'myra@email.com',
  //     child: [{ firstName: 'Meg' }, { firstName: 'Luis' }],
  //   },
  // ]);
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

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
