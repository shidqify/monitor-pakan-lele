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
    let kolams = await db.kolam.findOne({ where: { kolam_id: req.params.id } });

    if (kolams) {
      

      const hasil_pangan = (kolams.jumlah_lele * kolams.berat_rata) * 0.03;
      const jumlah_pangan = {
        jumlah_pangan: hasil_pangan,
      }

      kolams
        .update(jumlah_pangan)
        .then((result) => {
          if (result) {
            return res.status(200).json({
              message: "Pakan telah dihitung",
              hasil: jumlah_pangan,
              result: result
            });
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