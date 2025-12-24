/// Role Upgrade

const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

const roleUpgrade = (req, res, next) => {
  try {
    const { id } = req.body;
    const user = AuthSchema.findOne({ _id: id });

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    user.role = "admin";

    res.status(200).json({
      message: "user role is upgrade",
    });
  } catch (error) {
    next(error);
  }
};

///  downgrade

const downgrade = (req, res, next) => {
  try {
    const { id } = req.body;
    const user = AuthSchema.findOne({ _id: id });
    if (!user) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    user.role = "user";

    res.status(200).json({
      message: "user role is downgrade",
    });
  } catch (error) {
    next(error);
  }
};

/// get all user

const getAllUser = (req, res, next) => {
  try {
    const users = AuthSchema.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  roleUpgrade,
  getAllUser,
  downgrade,
};
