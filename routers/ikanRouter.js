const express = require("express");

const { 
  inputIkan,
  viewIkan,
  viewAllIkan,
  hitungIkan,

} = require("../controllers/ikanControllers");

const router = express.Router();

router.post("/input-ikan", inputIkan);
router.get("/view-ikan/:id", viewIkan);
router.get("/view-ikan", viewAllIkan);
router.post("/hitung-ikan", hitungIkan);

module.exports = router;