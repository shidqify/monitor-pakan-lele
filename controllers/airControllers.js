const db = require("../models");

const inputAir = (req, res, next) => {
  try {
    db.air
      .create(req.body)
      .then((result) => {
        res.rest.success("Data air berhasil diinput");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      })
  } catch (error) {
    next(error);
  };
};

const hitungAir = async (req, res, next) => {
  try {
    let airs = await db.air.findOne({ where: { air_id: req.body.air_id } });

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
        return res.rest.success("Air masih dalam kondisi baik");
      } else {
        return res.rest.success("Air sudah tidak dalam kondisi baik");
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
    const dataAir = await db.air.findOne({ where: { id: req.params.id } });

    if (!dataAir) {
      return res.rest.notFound("Air Not Found")
    }

    res.rest.success({ air: dataAir });
  } catch (error) {
    next(error);
  }
}

const viewAllAir = (req, res, next) => {
  db.air
    .findAll()
    .then((result) => {
      res.rest.success(result);
    })
    .catch((error) => {
      next(error);
    });
};

const updateAir = async (req, res, next) => {
  try {
    let dataAir = await db.air.findOne({ where: { id: req.params.id } });

    const updateData = {
      ph_air : req.body.ph_air,
      kadar_air : req.body.kadar_air,
      warna_air : req.body.warna_air,
    }

    dataAir
      .update(updateData)
      .then((result) => {
        res.rest.success("Data air telah diperbaharui");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      });
  } catch (error) {
    next(error);
  }
}

const deleteAir = async (req, res, next) => {
  try {
    const dataAir = await db.air.findOne({ where: { id: req.params.id } });

    if (dataAir){
      await dataAir
        .destroy()
        .then((result) => {
          if (result) {
            res.rest.success("Data Air berhasil dihapus");
          } else {
            res.rest.notFound("Data Air tidak ditemukan");
          }
        })
        .catch((err) => {
          res.rest.badRequest(err);
        });
    } else {
      return res.rest.notFound("Data Air tidak ditemukan");
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