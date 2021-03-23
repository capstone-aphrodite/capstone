const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Adult = require("./model");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const PORT = 4000;

//logging middelware
app.use(cors());

//bodyparsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017/capstone";

//database integration
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));



const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

//passport registration
passport.serializeUser((adult, done) => done(null, adult.id));

passport.deserializeUser(async (id, done) => {
  try {
    const adult = await Adult.findById(id);
    done(null, adult);
  } catch (error) {
    done(error);
  }
});

//initiates a session connected to the mongo store
app.use(
  session({
    store: MongoStore.create({mongoUrl: uri}),
    secret: process.env.SESSION_SECRET || "this app is pandemic inspired",
    resave: false,
    saveUninitialized: false,
  })
);
//initializes passport
app.use(passport.initialize());
app.use(passport.session());

//mounting router(boilermaker)
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
