const express = require("express");

const { 
  inputKolam,
  viewKolam,
  viewAllKolam,
} = require("../controllers/kolamControllers");

const router = express.Router();

router.post("/input-kolam", inputKolam);
router.get("/view-kolam/:id", viewKolam);
router.get("/view-kolam", viewAllKolam);

module.exports = router;