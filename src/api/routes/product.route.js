var express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// const { createproductValidate, validate } = require('../validators/createproduct.validate');
// const upload = require('../middlewares/upload.middleware')

router.get('/edit/:id', productController.edit);
router.post('/update/:id', productController.update);
router.post('/delete/:id', productController.deleted);
router.post('/create', productController.create);
router.get('/list-product', productController.show)

module.exports = router;