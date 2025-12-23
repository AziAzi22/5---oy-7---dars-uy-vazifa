const sendMessage = require("../utils/email-sender.js")
const bcrypt = require("bcryptjs");
const tokenGenerotor = require("../utils/token-generator");
const AuthSchema = require("../schema/auth.schema");

// register
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hash = await bcrypt.hash(password, 14);

    const generatedCode = +Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    await sendMessage(email, generatedCode);
    await AuthSchema.create({
      email,
      password: hash,
      username,
    });

    res.status(201).json({
      message: "registred ✌️",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "you are not registered",
      });
    }

    const decode = await bcrypt.compare(password, user.password);

    if (decode) {
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
    } else {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
