const express = require("express");

const { 
  inputTimer,
  viewTimer,
  viewAllTimer,
  updateTimer,
  deleteTimer,
} = require("../controllers/timerControllers");

const { authenticateToken, permit } = require("../middleware/auth");

const router = express.Router();

router.post("/input-timer", authenticateToken, inputTimer);
router.get("/view-timer/:id", authenticateToken, viewTimer);
router.get("/view-timer", authenticateToken, viewAllTimer);
router.put("/update-timer/:id", authenticateToken, updateTimer);
router.delete("/delete-timer/:id", authenticateToken, deleteTimer);

module.exports = router;