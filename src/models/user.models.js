import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchemna = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  wathchistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchemna.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);

  next();
});

userSchemna.methods.isPasswordCorrect = async function (password) {
  await bcrypt.compare(password, this.password);
};

userSchemna.methods.generateAccessToken = function () {
  // short lived token
  var token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchemna.methods.generateRefreshToken = function () {
  // short lived token,need only one (id)
  var token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchemna);
