const express = require("express");

const { 
  inputAir,
  viewAir,
  viewAllAir,
  hitungAir,
  updateAir,
  deleteAir,
} = require("../controllers/airControllers");

const { authenticateToken, permit } = require("../middleware/auth");

const router = express.Router();

router.post("/input-air", authenticateToken, inputAir);
router.get("/view-air/:id", authenticateToken, viewAir);
router.get("/view-air", authenticateToken, viewAllAir);
router.post("/hitung-air", authenticateToken, hitungAir);
router.put("/update-air", authenticateToken, updateAir);
router.delete("/delete-air", authenticateToken, deleteAir);

module.exports = router;