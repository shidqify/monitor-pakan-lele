const db = require("../models");

const inputIkan = (req, res, next) => {
  try {
    db.ikan
      .create(req.body)
      .then((result) => {
        res.status(200).json({
          message: "Data ikan berhasil diinput",
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

const hitungIkan = async (req, res, next) => {
  try {
    let ikans = await db.ikan.findOne({ where: { ikan_id: req.params.id } });

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
        return res.status(200).json({
          message: "Ikan dalam kondisi sehat dan siap panen",
        });
      } else {
        return res.status(200).json({
          message: "Ikan tidak dalam kondisi sehat atau siap panen",
        });
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
    const dataIkan = await db.ikan.findOne({ where: { ikan_id: req.params.id } });

    if (!dataIkan) {
      return res.status(404).json({
        message: "Ikan Not Found",
      });
    }

    res.status(200).json({ 
      ikan: dataIkan 
    });
  } catch (error) {
    next(error);
  }
}

const viewAllIkan = (req, res, next) => {
  db.ikan
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

const updateIkan = async (req, res, next) => {
  try {
    let dataIkan = await db.ikan.findOne({ where: { ikan_id: req.params.id } });
  
    if (req.body.umur == null){
      umur = dataIkan.umur;
    } else {
      umur = req.body.umur;
    }

    if (req.body.berat == null){
      berat = dataIkan.berat;
    } else {
      berat = req.body.berat;
    }

    if (req.body.ukuran == null){
      ukuran = dataIkan.ukuran;
    } else {
      ukuran = req.body.ukuran;
    }


    const updateData = {
      umur : umur,
      berat : berat,
      ukuran : ukuran,
    }

    dataIkan
      .update(updateData)
      .then((result) => {
        res.status(200).json({
          message: "Data ikan telah diperbaharui",
          resul: result,
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

const deleteIkan = async (req, res, next) => {
  try {
    const dataIkan = await db.ikan.findOne({ where: { ikan_id: req.params.id } });

    if (dataIkan){
      await dataIkan
        .destroy()
        .then((result) => {
          if (result) {
            res.status(200).json({
              message: "Data Ikan berhasil dihapus",
            });
          } else {
            res.status(404).json({
              message: "Data Ikan tidak ditemukan"
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
        message: "Data Ikan tidak ditemukan",
      });
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