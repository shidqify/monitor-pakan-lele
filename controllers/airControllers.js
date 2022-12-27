const db = require("../models");

const inputAir = (req, res, next) => {
  try {
    db.air
      .create(req.body)
      .then((result) => {
        res.status(200).json({
          message: "Data air berhasil diinput",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      })
  } catch (error) {
    next(error);
  };
};

const hitungAir = async (req, res, next) => {
  try {
    let airs = await db.air.findOne({ where: { air_id: req.params.id } });

    if (airs) {
      const kategori = {
        ph: req.body.ph_air,
        kadar: req.body.kadar_air,
        warna: req.body.warna_air,
      }

      const hasilPh = true;
      const hasilKadar = true;
      const hasilWarna = true;

      if (kategori.ph < 7 && kategori.ph > 8) {
        hasilPh = false;
      }
      if (kategori.kadar < 33 && kategori.kadar > 110) {
        hasilKadar = false;
      }
      if (kategori.warna != "hijau" && kategori.warna != "merah") {
        hasilWarna = false;
      }

      if (hasilPh && hasilKadar && hasilWarna) {
        return res.status(200).json({
          message: "Air masih dalam kondisi baik",

        });
      } else {
        return res.status(200).json({
          message: "Air sudah tidak dalam kondisi baik"
        });
      }
    } else {
      return res.status(404).json({
        message: "Data air tidak ditemukan",
      });
    }    
  } catch (error) {
    next(error);
  }
}

const viewAir = async (req, res, next) => {
  try {
    const dataAir = await db.air.findOne({ where: { air_id: req.params.id } });

    if (!dataAir) {
      return res.status(404).json({
        message: "Air Not Found",
      })
    }

    res.status(200).json({ 
      air: dataAir,
    });
  } catch (error) {
    next(error);
  }
}

const viewAllAir = (req, res, next) => {
  db.air
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

const updateAir = async (req, res, next) => {
  try {
    let dataAir = await db.air.findOne({ where: { air_id: req.params.id } });

    if (req.body.ph_air == null) {
      const ph = dataAir.ph_air;
    } else {
      const ph = req.body.ph_air;
    }
    if (req.body.kadar_air == null) {
      const kadar = dataAir.kadar_air;
    } else {
      const kadar = req.body.kadar_air;
    }
    if (req.body.warna_air == null) {
      const warna = dataAir.warna_air;
    } else {
      const warna = req.body.warna_air;
    }

    const updateData = {
      ph_air : ph,
      kadar_air : kadar,
      warna_air : warna,
    }

    dataAir
      .update(updateData)
      .then((result) => {
        res.status(200).json({
          message: "Data air telah diperbaharui",
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

const deleteAir = async (req, res, next) => {
  try {
    const dataAir = await db.air.findOne({ where: { air_id: req.params.id } });

    if (dataAir){
      await dataAir
        .destroy()
        .then((result) => {
          if (result) {
            res.status(200).json({
              message: "Data Air berhasil dihapus",
              resutl: result,
            });
          } else {
            res.status(404).json({
              message: "Data Air tidak ditemukan",
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
        message: "Data Air tidak ditemukan",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  inputAir,
  hitungAir,
  viewAir,
  viewAllAir,
  updateAir,
  deleteAir,
}