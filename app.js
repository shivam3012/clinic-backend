const express = require("express");
const app = express();
require('dotenv').config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const v1Routes = require("./src/router/index");
const config = require("./src/config/config");

app.use(morgan("dev"));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// mount all routes on /api path
app.use("/", v1Routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = {
    message: "404 Not found",
    status: 404
  }
  next(err);
});

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(process.env.PORT, () => {
    console.info(`server is running at http://localhost:${process.env.PORT}`); // eslint-disable-line no-console
  });
}


module.exports = app;
