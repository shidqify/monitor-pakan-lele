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
        res.status(201).json({
          message: "Waktu berhasil diinput",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err,
        });
      })
  } catch (error) {
    next(error);
  };
};

const viewTimer = async (req, res, next) => {
  try {
    const dataTimer = await db.timer.findOne({ where: { id: req.params.id } });

    if (!dataTimer) {
      // return res.rest.notFound("Timer Not Found")
      return res.status(404).json({
        message: "Timer not Found",
      })
    }

    // res.rest.success({ timer: dataTimer });
    res.status(200).json({
      message: "Timer ditemukan",
      timer: dataTimer,
    })
  } catch (error) {
    next(error);
  }
}

const viewAllTimer = (req, res, next) => {
  db.timer
    .findAll()
    .then((result) => {
      // res.rest.success(result);
      res.status(200).json({
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const updateTimer = async (req, res, next) => {
  try {
    let dataTimer = await db.timer.findOne({ where: { id: req.params.id } });

    const updateData = {
      waktu: req.body.waktu,
    }

    dataTimer
      .update(updateData)
      .then((result) => {
        res.status(201).json({
          message: "Data Timer telah diperbaharui",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err,
        });
      });
  } catch (error) {
    next(error);
  }
}

const deleteTimer = async (req, res, next) => {
  try {
    const dataTimer = await db.timer.findOne({ where: { id: req.params.id } });

    if (dataTimer){
      await dataTimer
        .destroy()
        .then((result) => {
          if (result) {
            res.status(200).json({
              message : "Data Timer berhasil dihapus",
              result: result,
            });
          } else {
            res.status(404).json({
              message: "Data Timer tidak ditemukan",
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            error: err,
          });
        });
    } else {
      return res.status(404).json({
        message: "Data Timer tidak ditemukan",
      });
    }
  } catch (error) {
    next(error);
  }
}

// aktifkan timer

module.exports = {
  inputTimer,
  viewTimer,
  viewAllTimer,
  updateTimer,
  deleteTimer,
}