import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


// This is the model for our users' data
export const userModel = mongoose.model("userscollection", userSchema);


