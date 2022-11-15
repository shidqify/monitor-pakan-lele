const db = require("../models");

const inputTimer = async (req, res, next) => {
  try {
    let timers = await db.timer.findOne({ where : { waktu: req.body.waktu } });
    
    if (timers) {
      return res.status(409).json({
        message: "Waktu sudah ada",
      });
    }
    
    db.timer
      .create(req.body)
      .then((result) => {
        res.rest.success("Waktu berhasil diinput");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      })
  } catch (error) {
    next(error);
  };
};

const viewTimer = async (req, res, next) => {
  try {
    const dataTimer = await db.timer.findOne({ where: { id: req.params.id } });

    if (!dataTimer) {
      return res.rest.notFound("Timer Not Found")
    }

    res.rest.success({ timer: dataTimer });
  } catch (error) {
    next(error);
  }
}

const viewAllTimer = (req, res, next) => {
  db.timer
    .findAll()
    .then((result) => {
      res.rest.success(result);
    })
    .catch((error) => {
      next(error);
    });
};

// aktifkan timer

module.exports = {
  inputTimer,
  viewTimer,
  viewAllTimer,
}