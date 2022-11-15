const express = require("express");

const { 
  inputAir,
  viewAir,
  viewAllAir,
  hitungAir,
} = require("../controllers/airControllers");

router.post("/input-air", inputAir);
router.get("/view-air/:id", viewAir);
router.get("/view-air", viewAllAir);
router.post("/hitung-air", hitungAir);