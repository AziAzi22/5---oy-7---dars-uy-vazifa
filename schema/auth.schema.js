const { Schema, model } = require("mongoose");

const Auth = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
      trim: true,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [30, "Username must be at most 30 characters long"],
    },
    password: {
      type: String,
      minLength: [8, "Password must be at least 8 characters long"],
      required: [true, "Password is required"],
      select: false,
    },
    birth_year: {
      type: Number,
      min: [1900, "Birth year must be at least 1900"],
      max: [new Date().getFullYear() - 13, "User must be older than 13 years"],
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AuthSchema = model("Auth", Auth);

module.exports = AuthSchema;
