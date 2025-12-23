const jwt = require("jsonwebtoken");

const superAdmin = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        message: "Bearer token not found",
      });
    }

    const token = bearerToken.split(" ");

    if (token[0] !== "Bearer") {
      return res.status(401).json({
        message: "Bearer token is required",
      });
    }

    if (!token[1]) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    const decode = jwt.verify(token[1], process.env.SECRET_KEY);
    if (decode.role !== "superadmin") {
      return res.status(403).json({
        message: "You don't have permission",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = superAdmin;