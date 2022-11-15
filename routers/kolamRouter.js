const express = require("express");

const { 
  inputKolam,
  viewKolam,
  viewAllKolam,
} = require("../controllers/kolamControllers");

router.post("/input-kolam", inputKolam);
router.get("/view-kolam/:id", viewKolam);
router.get("/view-kolam", viewAllKolam);