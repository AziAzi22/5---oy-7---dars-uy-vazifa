/// Role Upgrade

const AuthSchema = require("../schema/auth.schema");

const roleUpgrade = (req, res) => {
  try {
    const { id } = req.body;
    const user = AuthSchema.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = "admin";

    res.status(200).json({
      message: "user role is upgrade",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

///  downgrade

const downgrade = (req, res) => {
  try {
    const { id } = req.body;
    const user = AuthSchema.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = "user";

    res.status(200).json({
      message: "user role is downgrade",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/// get all user

const getAllUser = (req, res) => {
  try {
    const users = AuthSchema.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  roleUpgrade,
  getAllUser,
  downgrade,
};
