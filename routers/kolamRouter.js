const express = require("express");

const { 
  inputKolam,
  viewKolam,
  viewAllKolam,
  hitungPakan,
  updateKolam,
  deleteKolam,
} = require("../controllers/kolamControllers");

const { authenticateToken, permit } = require("../middleware/auth");

const router = express.Router();

router.post("/input-kolam", authenticateToken, inputKolam);
router.get("/view-kolam/:id", authenticateToken, viewKolam);
router.get("/view-kolam", authenticateToken, viewAllKolam);
router.put("/hitung-pakan", authenticateToken, hitungPakan);
router.put("/update-kolam", authenticateToken, updateKolam);
router.delete("/delete-kolam", authenticateToken, deleteKolam);

module.exports = router;