const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const VisitorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  visitortype: {
    type: String,
    required: true,
    trim: true,
  },
  uid: {
    type: Number,
    min: 0,
    max: 10,
  },
  myDate: {
    type: Date,
    default: Date.now,
  },
});

VisitorSchema.pre("save", async function (next) {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const MyModel = mongoose.model("Visitor", VisitorSchema);

module.exports = MyModel;
