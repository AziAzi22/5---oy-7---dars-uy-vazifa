const jwt = require("jsonwebtoken");

const tokenGenerotor = (payload) => {
  try {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = tokenGenerotor;
