const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET);
  // await db.Token.create({ token });
  return token;
};

const createUser = async (req, res, next) => {
    try {
      let users = await db.user.findOne({ where: { username: req.body.username } });
  
      if (users)
        return res.status(409).json({
          message: "Username already exist!",
        });
  
      req.body.password = req.body.password
        ? md5(req.body.password)
        : req.body.password;
  
      db.user
        .create(req.body)
        .then((result) => {
          // res.rest.success("Anda telah berhasil Mendaftar");
          res.status(201).json({
            message: "Anda telah berhasil mendaftar!",
            result: result,
          })
        })
        .catch((error) => {
          // res.rest.badRequest(error);
          res.status(400).json({
            message: "Something went wrong!",
            error: error,
          })
        });
    } catch (error) {
      next(error);
    }
  };

const loginUser = (req, res, next) => {
  let { username, password } = req.body;
  db.user
    .findOne({
    where: {
        username: username,
        password: md5(password),
      },
    })
    .then(async (result) => {
      if (result) {
        // res.rest.success({
        //   token: await generateToken(result.user_id),
        //   user_id: result.user_id,
        // });
        res.status(201).json({
          token: await generateToken(result.user_id),
          user_id: result.user_id,
        });
      } else {
        // res.rest.badRequest("Username / password salah");
        res.status(401).json({
          message: "Username / password salah",
          error: error,
        })
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
      return res.status(401).json(
        `Profile dengan ID ${req.params.id} tidak ditemukan`
      );

    res.status(200).json({ 
      profile: dataUser 
    });
  } catch (error) {
    next(error);
  };
};

const mainPage = (req, res, next) => {
  res.status(200).json({
    message: "Hello World!"
  });
}

module.exports = {
  createUser,
  loginUser,
  viewUser,
  mainPage,
}