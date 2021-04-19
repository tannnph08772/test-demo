const express = require('express');
const shopController = require('../controllers/shop.controller');
const checkPostCart = require('../middlewares/checkPostCart.middleware');
const CheckCart = require('../middlewares/checkCart.middleware')
const isLogin = require('../middlewares/isLoggin.middleware');
const { PaymentValidate, validate } = require('../validators/createPayment.validate');
const router = express.Router();

router.get('/cart', isLogin, CheckCart.checkUserCart, shopController.getCart);
router.post('/add-to-cart', isLogin, CheckCart.checkUserCart, checkPostCart, shopController.postCart);
router.get('/orders', isLogin, shopController.getOrders);
router.get('/list-orders', isLogin, shopController.getAllOrder);
router.post('/cart-delete-item', isLogin, CheckCart.checkDelCart, shopController.deleteItem);
router.post('/create-order', isLogin, CheckCart.checkOrder, shopController.postOrder);
router.post('/update-cart', isLogin, CheckCart.checkUpdateCart, shopController.updateCart);
router.post('/create-payment/:id', isLogin, PaymentValidate(), validate, CheckCart.checkPayment, shopController.payment);
router.post('/payment/:id', isLogin, CheckCart.checkOrder, shopController.checkPayment);

module.exports = router;