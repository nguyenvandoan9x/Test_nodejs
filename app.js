var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var handlebars = require("express-handlebars");

const mongoose = require("mongoose");
const connectDB = require("./configurationDB/index");
const productModel = require("./models/product");
var db = mongoose.connection;

var app = express();

// view engine setup
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",

    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,

      allowProtoMethodsByDefault: true,
    },
  })
);

connectDB();

//Bắt sự kiện error
db.on("error", function (err) {
  if (err) console.log(err);
});
//Bắt sự kiện open
db.once("open", function () {
  console.log("Kết nối thành công !");
});

// let product = new productModel();
// product.name = 'laptop'
// product.description = 'Dell Inspiron 5547 | i5 4210U | RAM 4 GB |SSD 120GB | 15.6” HD | Card On'
// product.price = 120000
// product.image ='some link hear'

// product.save((err)=>{
//   if (err)
//   {
//     console.log('Luu that bai');
//     return handleError(err);
//   }
//   console.log('Luu thanh cong');
// })

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
