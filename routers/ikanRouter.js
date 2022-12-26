const express = require("express");

const { 
  inputIkan,
  viewIkan,
  viewAllIkan,
  hitungIkan,
  updateIkan,
  deleteIkan,
} = require("../controllers/ikanControllers");

const { authenticateToken, permit } = require("../middleware/auth");

const router = express.Router();

router.post("/input-ikan", authenticateToken, inputIkan);
router.get("/view-ikan/:id", authenticateToken, viewIkan);
router.get("/view-ikan", authenticateToken, viewAllIkan);
router.post("/hitung-ikan", authenticateToken, hitungIkan);
router.put("/update-ikan/:id", authenticateToken, updateIkan);
router.delete("/delete-ikan/:id", authenticateToken, deleteIkan);

module.exports = router;