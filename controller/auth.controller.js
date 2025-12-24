const sendMessage = require("../utils/email-sender.js");
const bcrypt = require("bcryptjs");
const tokenGenerotor = require("../utils/token-generator");
const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../utils/custom-error-handler.js");

// register

const register = async (req, res, next) => {
  try {
    const { email, password, username, birth_year } = req.body;

    const exists = await AuthSchema.findOne({
      $or: [{ email }, { username }],
    });

    if (exists) {
      throw CustomErrorHandler.AlreadyExist("Email or username already exists");
    }

    const hash = await bcrypt.hash(password, 14);

    const generatedCode = +Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    await AuthSchema.create({
      email,
      password: hash,
      username,
      birth_year,
    });

    await sendMessage(email, generatedCode);

    res.status(201).json({
      message: "registred ✌️",
    });
  } catch (error) {
    next(error);
  }
};

// login

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await AuthSchema.findOne({ email }).select("+password");

    if (!user) {
      throw CustomErrorHandler.NotFound("you are not registered");
    }

    const decode = await bcrypt.compare(password, user.password);

    if (!decode) {
      throw CustomErrorHandler.UnAuthorized("Invalid password");
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = tokenGenerotor(payload);

    res.status(200).json({
      message: "Succes",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
