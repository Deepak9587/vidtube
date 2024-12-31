import mongoose, { Schema } from "mongoose";

const vidoeSchema = new Schema({
  videoFile: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desciption: {
    type: String,
    required: true,
  },
  vieww: {
    type: Number,
    required: true,
  },
});

export const Video = mongoose.model("User", vidoeSchema);
