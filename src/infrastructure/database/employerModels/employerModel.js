import mongoose from "mongoose";

const EmployerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      default: null,
    },
    profileCoverPic: {
      type: String,
      default : null
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Employer = mongoose.model("Employer", EmployerSchema);
