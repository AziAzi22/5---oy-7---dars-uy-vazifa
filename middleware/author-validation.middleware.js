const { AuthorValidator } = require("../validator/author.validation");

module.exports = function (req, res, next) {
  const { error } = AuthorValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};
