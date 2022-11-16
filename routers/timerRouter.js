const express = require("express");

const { 
  inputTimer,
  viewTimer,
  viewAllTimer,
} = require("../controllers/timerControllers");

const router = express.Router();

router.post("/input-timer", inputTimer);
router.get("/view-timer/:id", viewTimer);
router.get("/view-timer", viewAllTimer);

module.exports = router;