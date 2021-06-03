var MyModel = require("../models/product");
var fs = require("fs");

class HomeController {
  //get-list-product
  GetListProduct(req, res, next) {
    MyModel.find({}, (err, docs) => {
      res.render("product/index", { docs });
    });
  }
  //get/create/product
  ProductCreate(req, res, next) {
    res.render("product/create");
  }

  //post
  ProductCreated(req, res, next) {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let image = req.file.path.slice(7);
    let product = new MyModel({ name, description, price, image });
    product.save((err) => {
      if (err) {
        res.json({ status: "err" });
      }
      res.redirect("/");
    });
  }

  //get//ProductUpdate
  ProductUpdate(req, res, next) {
    MyModel.findOne({ _id: req.params.id }, (err, docs) => {
      if (err) res.json({ status: "error" });
      res.render("product/update", { docs });
    });
  }

  //POST//ProductUpdate
  ProductUpdated(req, res, next) {
    let _id = req.body._id;
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let image = req.file.path.slice(7);
    MyModel.findOne({ _id }, (err, docs) => {
      var filePath = "public\\" + docs.image;
      try {
        fs.unlinkSync(filePath);
        console.error("file removed");
      } catch (err) {}
    });
    MyModel.findByIdAndUpdate(
      { _id },
      { name, description, price, image },
      { new: true },
      (err, docs) => {
        if (err) res.json({ status: "error" });
        return docs;
      }
    ).then(function (docs) {
      res.redirect("/");
    });
  }

  //get/Product/delete
  ProductDeleted(req, res, next) {
    MyModel.findOneAndRemove({_id:req.params.id}, (err,docs)=>{
      if(err) res.json({status:'err'})

      var filePath = "public\\" + docs.image;
      try {
        fs.unlinkSync(filePath);
        console.error("file removed");
      } catch (err) {console.error("file err");}

      res.redirect('/product/manage')
    })
  }

  //get/produc/manage
  manage(req, res, next) {
    MyModel.find({}, (err, docs) => {
      res.render("product/manage", { docs });
    });
  }
}

module.exports = new HomeController();
