require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

const restResponse = require("express-rest-response");
const options = {
  showStatusCode: false,
  showDefaultMessage: false,
};

const db = require("./models");

const userRouter = require("./routers/userRouter");
const timerRouter = require("./routers/timerRouter");
const kolamRouter = require("./routers/kolamRouter");
const ikanRouter = require("./routers/ikanRouter");
const airRouter = require("./routers/airRouter");

app.use(cors());

app.use(restResponse(options));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/uploads", express.static("uploads"));
app.use("/", userRouter);
app.use("/timer", timerRouter);
app.use("/kolam", kolamRouter);
app.use("/ikan", ikanRouter);
app.use("/air", airRouter);

app.use((req, res, next) => {
  const err = new Error("");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    // res.rest.notFound("End point not found");
    res.status(404).json({
      message: "End point not found",
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    // res.rest.serverError(err.message || "Internal server error");
  }
});

const dbOptions = {
  alter: true,
  // force: true,
};

const port = process.env.PORT || 5000;

db.sequelize.sync(dbOptions).then(() => {
  app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}`);
  });
});