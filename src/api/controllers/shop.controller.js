const Product = require('../models/product.model');
const CartItem = require('../models/cartItem.model');
const Payment = require("../models/payment.model");
const status = require('../../../util/statusOrder');
const Order = require('../models/order.model').Order;
const modelOrder = require('../models/order.model');
const Cart = require('../models/cart.model');
const events = require('events');
const eventEmitter = new events.EventEmitter();

exports.getCart = async(req, res) => {
    eventEmitter.on('clicked', async() => {
        const abc = await Cart.findOne({ where: { userId: req.user.id }, include: Product })
        res.json(abc)
    })
    eventEmitter.emit('clicked');
};

exports.postCart = async(req, res, next) => {
    const newQty = 1;
    product = req.locals

    await CartItem.create({
        cartId: res.locals.cartId,
        productId: product.id,
        priceItem: product.price,
        totalPrice: newQty * new Number(product.price),
        quantity: newQty
    }).then(
        abc => res.json(abc)
    )
};

exports.updateCart = async(req, res, next) => {
    product = req.locals
    await CartItem.update({
        quantity: res.locals.newQty,
        totalPrice: new Number(res.locals.newQty) * new Number(product.price),
        priceItem: product.price
    }, { where: { cartId: res.locals.cartId, productId: product.id } })
    res.send("ok")
};

exports.deleteItem = (req, res) => {
    products = req.locals;
    const product = products[0];
    product.cartItem.destroy();
    return res.send("đã xóa thành công")
};

exports.getOrders = (req, res) => {
    Order.findAll({
            where: { userId: req.user.id },
            include: [{ model: Product }, { model: Payment }]
        })
        .then(orders => {
            res.json(orders)
        })
};

exports.postOrder = async(req, res, next) => {
    products = req.locals;

    Order.create({
        userId: req.user.id,
        total: res.locals.total,
        quantity: res.locals.qty,
        status: status.unpaid
    }).then(order => {
        order.addProduct(products.map(pro => {
            pro.orderItem = {
                quantity: pro.cartItem.quantity,
                totalPrice: pro.cartItem.totalPrice,
                priceItem: pro.cartItem.priceItem
            };
            return pro;
        }))
    })
}

exports.payment = async(req, res, next) => {
    order = req.locals;

    await Payment.create({
        staffId: 1,
        paymentMethod: res.locals.paymentMethod,
        amount: res.locals.amount,
        orderId: order.id
    }).then(payment => res.json(payment))

}

exports.getAllOrder = async(req, res) => {
    const allOrder = await modelOrder.getAllOrder();
    return res.json(allOrder);
};