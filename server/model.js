const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

let adultSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Invalid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  child: [
    {
      firstName: { type: String },
      avatar: {
        type: String,
        default:
          "https://images.assetsdelivery.com/compings_v2/drawkman/drawkman1709/drawkman170900284.jpg",
        required: true,
      },
      totalPoints: {
        type: Number,
        default: 0,
        required: true,
      },
      dailyPoints: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  ],
});

const Adult = mongoose.model("Adult", adultSchema);
module.exports = Adult;
