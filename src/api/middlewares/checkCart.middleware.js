const Product = require('../models/product.model');;
const Cart = require("../models/cart.model");
const Order = require('../models/order.model').Order;

exports.checkUserCart = async(req, res, next) => {
    const shopCart = await Cart.findOne({ where: { userId: req.user.id } })
    if (!shopCart) {
        req.user.createCart();
        return next();
    }
    return next();
};

exports.checkQuantity = async(req, res, next) => {
    await Product.findOne({ where: { id: req.body.productId } })
        .then(
            product => {
                if (product.quantity <= 0) {
                    return res.send("Sản phẩm đã hết hàng")
                } else {
                    return next();
                }
            }
        )
};

exports.checkUpdateCart = async(req, res, next) => {
    const prodId = req.body.productId;

    req.locals = await req.user.getCart()
        .then(cart => {
            res.locals.cartId = cart.id;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            res.locals.products = products;
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQty = product.cartItem.quantity;
                res.locals.newQty = oldQty - 1;
                return product;
            }
        })
    if (res.locals.products == "") {
        return res.send('Không thể thực hiện thao tác này')
    } else {
        return next();
    }

};

exports.checkDelCart = async(req, res, next) => {
    const prodId = req.body.productId;

    req.locals = await req.user.getCart()
        .then(cart => {
            res.locals.cartId = cart.id;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
    if (req.locals == "") {
        return res.send(403, "You do not have rights to visit this page");
    } else {
        return next();
    }
};


exports.checkOrder = async(req, res, next) => {
    let totalOrder = 0;
    let Qty = 0;
    req.locals = req.user.getCart()
        .then(cart => {
            res.locals.cart = cart;
            return cart.getProducts();
        })
        .then(products => {
            if (products) {
                products.map(pro => {
                    return [totalOrder += new Number(pro.cartItem.totalPrice), Qty += new Number(pro.cartItem.quantity)]
                })
                req.locals['total'] = totalOrder;
                req.locals['qty'] = Qty;
            }

            return products;
        })
    const order = await req.locals;
    if (order == "") {
        return res.send(403, "You do not have rights to visit this page")
    } else {
        return next();
    }
};

exports.checkPayment = async(req, res, next) => {
    req.locals = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } })
    console.log(req.locals)
    if (req.locals == null) {
        return res.json("Bạn chưa có sản phẩm để thanh toán");
    } else {
        return next();
    }
};