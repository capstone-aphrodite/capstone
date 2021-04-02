const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Adult = require("./model");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const PORT = process.env.PORT || 4000;

//logging middelware
app.use(cors());

//bodyparsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let uri;
if (process.env.NODE_ENV === "development") {
  uri = "mongodb://127.0.0.1:27017/capstone";

  //database integration
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((error) => console.log(error));
} else {
  uri = process.env.DATABASE_URL;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

//passport registration
passport.serializeUser((adult, done) => done(null, adult.id));

passport.deserializeUser(async (id, done) => {
  try {
    const adult = await Adult.findById(id);
    delete adult.password;
    done(null, adult);
  } catch (error) {
    done(error);
  }
});

//initiates a session connected to the mongo store
app.use(
  session({
    store: MongoStore.create({ mongoUrl: uri }),
    secret: process.env.SESSION_SECRET || "this app is pandemic inspired",
    resave: false,
    saveUninitialized: false,
  })
);
//initializes passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
//because public/index.html doesnt have javascript in it. no script tags.
//only in production because only heroku(production) will do npm run build. Unique to create react app

// if (process.env.NODE_ENV === "production") {

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });
// }

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
