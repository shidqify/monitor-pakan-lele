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

module.exports = {
  inputIkan,
  hitungIkan,
  viewIkan,
  viewAllIkan,
}