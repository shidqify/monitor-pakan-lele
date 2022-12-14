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

const hitungPakan = async (req, res, next) => {
  try {
    let kolams = await db.kolam.findOne({ where: { kolam_id: req.body.kolam_id } });

    if (kolams) {
      

      req.body.jumlah_pangan = (req.body.jumlah_lele * req.body.jumlah_lele) * 0.03;

      kolams
        .update(req.body)
        .then((result) => {
          if (result) {
            return res.rest.success(`Pakan telah dihitung : ${req.body.jumlah_pangan}`);
          }
          return res.rest.badRequest("Pakan gagal dihitung");
        })
        .catch((err) => {
          res.rest.badRequest(err);
        })
    }

    
  } catch (error) {
    next(error);
  }
}

const updateKolam = async (req, res, next) => {
  try {
    let dataKolam = await db.kolam.findOne({ where: { id: req.params.id } });

    const updateData = {
      jumlah_lele: req.body.jumlah_lele,
      berat_rata: req.body.berat_rata,
      luas_kolam: req.body.luas_kolam,
    }

    dataKolam
      .update(updateData)
      .then((result) => {
        res.rest.success("Data Kolam telah diperbaharui");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      });
  } catch (error) {
    next(error);
  }
}

const deleteKolam = async (req, res, next) => {
  try {
    const dataKolam = await db.kolam.findOne({ where: { id: req.params.id } });

    if (dataKolam){
      await dataKolam
        .destroy()
        .then((result) => {
          if (result) {
            res.rest.success("Data Kolam berhasil dihapus");
          } else {
            res.rest.notFound("Data Kolam tidak ditemukan");
          }
        })
        .catch((err) => {
          res.rest.badRequest(err);
        });
    } else {
      return res.rest.notFound("Data Kolam tidak ditemukan");
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