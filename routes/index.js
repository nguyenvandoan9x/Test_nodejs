var express = require('express');
var router = express.Router();
var HomController = require('../controller/homeController')
var multer  = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+".jpg")
    }
  })
   
  var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', HomController.GetListProduct);
router.get('/product/create', HomController.ProductCreate);
router.post('/product/created',upload.single('image'), HomController.ProductCreated);

router.get('/product/update/id/:id',HomController.ProductUpdate)
router.post('/product/updated',upload.single('image'),HomController.ProductUpdated)

router.get('/product/deleted/id/:id',HomController.ProductDeleted)

router.get('/product/manage',HomController.manage)

module.exports = router;
