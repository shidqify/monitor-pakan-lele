const { body } = require("express-validator");

const createUserSchema = [
    body("username").notEmpty().withMessage("nama tidak boleh kosong"),
    body("nama_user").notEmpty().withMessage("nama tidak boleh kosong"),
    body("password")
      .notEmpty()
      .withMessage("password tidak boleh kosong")
      .isLength({ min: 8 })
      .withMessage("Password minimal 8 karakter"),
];

const loginUserSchema = [
    body("username").notEmpty().withMessage("nama tidak boleh kosong"),
    body("password")
      .notEmpty()
      .withMessage("password tidak boleh kosong")
      .isLength({ min: 8 })
      .withMessage("Password minimal 8 karakter"),
];

module.exports = {
    createUserSchema,
    loginUserSchema,
}