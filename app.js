var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

// Env
const config = require("./config/index");

const passport = require("passport");

// Homepage
const indexRouter = require("./routes/index");

const customerRouter = require("./routes/customer");
const wineRouter = require("./routes/wine");
const brandCompanyRouter = require("./routes/brandCompany");

const errorHandler = require("./middleware/errorHandler");

var app = express();

// View Engine Setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
var app = express();
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// PassportJWT
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/customer", customerRouter);
app.use("/wine", wineRouter);
app.use("/brandCompany", brandCompanyRouter);

app.use(errorHandler);

// Catch 404 & Forward to ErrorHandler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render Error Page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
