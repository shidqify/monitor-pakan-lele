const express = require("express");

const { 
  createUser,
  loginUser,
  viewUser,
  mainPage,
} = require("../controllers/userControllers");

const { authenticateToken, permit } = require("../middleware/auth");

const { validate } = require("../middleware/validation/index");
const {
  createUserSchema,
  loginUserSchema,
} = require("../middleware/validation/schema/userSchema");

const router = express.Router();

router.get("/", mainPage);
router.post("/register", validate(createUserSchema), createUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/view-user/:id", authenticateToken, viewUser);

module.exports = router;