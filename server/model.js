const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

let adultSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Invalid email address'],
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
          'https://images.assetsdelivery.com/compings_v2/drawkman/drawkman1709/drawkman170900284.jpg',
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
      dailyPointGoal: {
        type: Number,
        default: 100,
        required: true,
      },
      rewardOptions: [],
      selectedReward: {
        type: String,
      },
      index: {
        type: Number
      }
    },
  ],
});

const Adult = mongoose.model('Adult', adultSchema);
module.exports = Adult;
