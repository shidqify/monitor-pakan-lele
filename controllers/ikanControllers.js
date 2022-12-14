const db = require("../models");

const inputIkan = (req, res, next) => {
  try {
    db.ikan
      .create(req.body)
      .then((result) => {
        res.rest.success("Data ikan berhasil diinput");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      })
  } catch (error) {
    next(error);
  };
};

const hitungIkan = async (req, res, next) => {
  try {
    let ikans = await db.ikan.findOne({ where: { ikan_id: req.body.ikan_id } });

    if (ikans) {
      const kategori = {
        umur: req.body.umur,
        berat: req.body.berat,
        ukuran: req.body.ukuran,
      }

      const hasilUmur = true;
      const hasilBerat = true;
      const hasilUkuran = true;

      if (kategori.umur < 3) {
        hasilUmur = false;
      }
      if (kategori.berat < 70) {
        hasilBerat = false;
      }
      if (kategori.ukuran < 20) {
        hasilUkuran = false;
      }

      if (hasilUmur && hasilBerat && hasilUkuran) {
        return res.rest.success("Ikan dalam kondisi sehat dan siap panen");
      } else {
        return res.rest.success("Ikan tidak dalam kondisi sehat atau siap panen");
      }
    } else {
      return res.status(404).json({
        message: "Data ikan tidak ditemukan",
      });
    }    
  } catch (error) {
    next(error);
  }
}

const viewIkan = async (req, res, next) => {
  try {
    const dataIkan = await db.ikan.findOne({ where: { id: req.params.id } });

    if (!dataIkan) {
      return res.rest.notFound("Ikan Not Found")
    }

    res.rest.success({ ikan: dataIkan });
  } catch (error) {
    next(error);
  }
}

const viewAllIkan = (req, res, next) => {
  db.ikan
    .findAll()
    .then((result) => {
      res.rest.success(result);
    })
    .catch((error) => {
      next(error);
    });
};

const updateIkan = async (req, res, next) => {
  try {
    let dataIkan = await db.ikan.findOne({ where: { id: req.params.id } });

    const updateData = {
      umur : req.body.umur,
      berat : req.body.berat,
      ukuran : req.body.ukuran,
    }

    dataIkan
      .update(updateData)
      .then((result) => {
        res.rest.success("Data ikan telah diperbaharui");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      });
  } catch (error) {
    next(error);
  }
}

const deleteIkan = async (req, res, next) => {
  try {
    const dataIkan = await db.ikan.findOne({ where: { id: req.params.id } });

    if (dataIkan){
      await dataIkan
        .destroy()
        .then((result) => {
          if (result) {
            res.rest.success("Data Ikan berhasil dihapus");
          } else {
            res.rest.notFound("Data Ikan tidak ditemukan");
          }
        })
        .catch((err) => {
          res.rest.badRequest(err);
        });
    } else {
      return res.rest.notFound("Data Ikan tidak ditemukan");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  inputIkan,
  hitungIkan,
  viewIkan,
  viewAllIkan,
  updateIkan,
  deleteIkan,
}