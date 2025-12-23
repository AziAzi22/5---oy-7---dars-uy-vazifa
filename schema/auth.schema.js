const { Schema, model } = require("mongoose");

const Auth = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      minLength: [8, "Password must be at least 8 characters long"],
      required: [true, "Password is required"],
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
