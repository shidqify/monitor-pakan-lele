const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
    try {
      let users = await db.user.findOne({ where: { email: req.body.email } });
  
      if (users)
        return res.status(409).json({
          message: "Email already exist!",
        });
  
      req.body.password = req.body.password
        ? md5(req.body.password)
        : req.body.password;
  
      db.user
        .create(req.body)
        .then((result) => {
          res.rest.success("Anda telah berhasil Mendaftar");
        })
        .catch((err) => {
          res.rest.badRequest(err);
        });
    } catch (error) {
      next(error);
    }
  };


const loginUser = (req, res, next) => {
  let { email, password } = req.body;
  db.user
    .findOne({
    where: {
        email: email,
        password: md5(password),
      },
    })
    .then(async (result) => {
      if (result) {
        res.rest.success({
        user_id: result.id,
        });
      } else {
        res.rest.badRequest("email / password salah");
      }
    })
    .catch((error) => {
      next(error);
    });
};

const viewUser = async (req, res, next) => {
  try {
    const dataUser = await db.user.findOne({ where: { id: req.params.id } });

    if (!dataUser)
      return res.rest.unauthorized(
        `Profile dengan ID ${req.params.id} tidak ditemukan`
      );

    res.rest.success({ profile: dataUser });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  createUser,
  loginUser,
  viewUser,
}