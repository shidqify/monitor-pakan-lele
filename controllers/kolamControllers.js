const db = require("../models");

const inputKolam = (req, res, next) => {
  try {
    db.kolam
      .create(req.body)
      .then((result) => {
        res.status(201).json({
          message: "Kolam berhasil diinput",
          result:  result,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        })
      });
  } catch (error) {
    next(error);
  }
};

const viewKolam = async (req, res, next) => {
  try {
    const dataKolam = await db.kolam.findOne({ where: { kolam_id: req.params.id } });

    if (!dataKolam) {
      return res.status(404).json({
        message:"Kolam Not Found",
      })
    }

    res.status(200).json({
      kolam: dataKolam ,
    });
  } catch (error) {
    next(error);
  }
}

const viewAllKolam = (req, res, next) => {
  db.kolam
    .findAll()
    .then((result) => {
      res.status(200).json({
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const hitungPakan = async (req, res, next) => {
  try {
    let kolams = await db.kolam.findOne({ where: { kolam_id: req.body.kolam_id } });

    if (kolams) {
      

      req.body.jumlah_pangan = (req.body.jumlah_lele * req.body.jumlah_lele) * 0.03;

      kolams
        .update(req.body)
        .then((result) => {
          if (result) {
            return res.status(200).json(
              `Pakan telah dihitung : ${req.body.jumlah_pangan}`
            );
          }
          return res.status(400).json({
            message :"Pakan gagal dihitung",
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: err,
          });
        })
    }
  } catch (error) {
    next(error);
  }
}

const updateKolam = async (req, res, next) => {
  try {
    let dataKolam = await db.kolam.findOne({ where: { kolam_id: req.params.id } });

    const updateData = {
      jumlah_lele: req.body.jumlah_lele,
      berat_rata: req.body.berat_rata,
      luas_kolam: req.body.luas_kolam,
    }

    dataKolam
      .update(updateData)
      .then((result) => {
        res.status(200).json({
          message: "Data Kolam telah diperbaharui",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  } catch (error) {
    next(error);
  }
}

const deleteKolam = async (req, res, next) => {
  try {
    const dataKolam = await db.kolam.findOne({ where: { kolam_id: req.params.id } });

    if (dataKolam){
      await dataKolam
        .destroy()
        .then((result) => {
          if (result) {
            res.status(200).json({
              message: "Data Kolam berhasil dihapus",
              result: result,
            });
          } else {
            res.status(404).json({
              message: "Data Kolam tidak ditemukan"
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            erro: err,
          });
        });
    } else {
      return res.status(404).json({
        message: "Data Kolam tidak ditemukan",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  inputKolam,
  viewKolam,
  viewAllKolam,
  hitungPakan,
  updateKolam,
  deleteKolam,
}