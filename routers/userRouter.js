const express = require("express");

const { 
  createUser,
  loginUser,
  viewUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/view-user/:id", viewUser);

module.exports = router;