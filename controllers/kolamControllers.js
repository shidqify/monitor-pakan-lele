const db = require("../models");

const inputKolam = (req, res, next) => {
  try {
    db.kolam
      .create(req.body)
      .then((result) => {
        res.rest.created("Kolam berhasil diinput");
      })
      .catch((error) => {
        res.rest.badRequest(error);
      });
  } catch (error) {
    next(error);
  }
};

const viewKolam = async (req, res, next) => {
  try {
    const dataKolam = await db.kolam.findOne({ where: { id: req.params.id } });

    if (!dataKolam) {
      return res.rest.notFound("Kolam Not Found")
    }

    res.rest.success({ kolam: dataKolam });
  } catch (error) {
    next(error);
  }
}

const viewAllKolam = (req, res, next) => {
  db.kolam
    .findAll()
    .then((result) => {
      res.rest.success(result);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  inputKolam,
  viewKolam,
  viewAllKolam,
}