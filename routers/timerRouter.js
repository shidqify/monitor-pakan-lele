const express = require("express");

const { 
  inputTimer,
  viewTimer,
  viewAllTimer,
} = require("../controllers/timerControllers");

router.post("/input-timer", inputTimer);
router.get("/view-timer/:id", viewTimer);
router.get("/view-timer", viewAllTimer);