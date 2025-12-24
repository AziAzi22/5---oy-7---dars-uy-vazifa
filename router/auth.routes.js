const { Router } = require("express");
const { register, login } = require("../controller/auth.controller");
const { LoginValidator } = require("../validator/login.validator");
const registerValidatorMiddleware = require("../middleware/register-validator.middleware");
const loginValidationMiddleware = require("../middleware/login-validation.middleware");

const authRouter = Router();

authRouter.post("/register", registerValidatorMiddleware, register);
authRouter.post("/login", loginValidationMiddleware, login);

module.exports = authRouter;
