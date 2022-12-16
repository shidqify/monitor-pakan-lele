const express = require("express");

const { 
  createUser,
  loginUser,
  viewUser,
  mainPage,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", mainPage);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/view-user/:id", viewUser);

module.exports = router;