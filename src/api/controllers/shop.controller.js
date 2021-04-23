const CartItem = require('../models/cartItem.model');
const Payment = require("../models/payment.model").Payment;
const status = require('../../../util/statusOrder');
const Order = require('../models/order.model').Order;
const modelOrder = require('../models/order.model');
const Cart = require('../models/cart.model');
const events = require('events');
const eventEmitter = new events.EventEmitter();

exports.getCart = async(req, res) => {
    eventEmitter.on('clicked', async() => {
        const abc = await Cart.findOne({ where: { userId: req.user.id }, include: ['products'] })
        const respone = {
            data: abc
        }
        return res.json(respone)
    })
    eventEmitter.emit('clicked');
};

exports.postCart = async(req, res, next) => {
    const newQty = 1;
    const product = req.locals

    const data = await CartItem.create({
        cartId: res.locals.cartId,
        productId: product.id,
        priceItem: product.price,
        totalPrice: newQty * new Number(product.price),
        quantity: newQty
    })
    const respone = {
        data: data
    }
    return res.json(respone)
};

exports.updateCart = async(req, res, next) => {
    const product = req.locals
    await CartItem.update({
            quantity: res.locals.newQty,
            totalPrice: new Number(res.locals.newQty) * new Number(product.price),
            priceItem: product.price
        }, { where: { cartId: res.locals.cartId, productId: product.id } })
        .then(cartItem => { return res.json(cartItem) })
};

exports.deleteItem = (req, res) => {
    const products = req.locals;
    const product = products[0];

    product.cartItem.destroy();
    return res.send("đã xóa thành công")
};

exports.getOrders = (req, res) => {
    Order.findAll({
            where: { userId: req.user.id },
            include: ['products', { model: Payment }]
        })
        .then(orders => { return res.json(orders) })
};

exports.postOrder = async(req, res, next) => {
    products = req.locals;

    Order.create({
        userId: req.user.id,
        total: res.locals.total,
        quantity: res.locals.qty,
        status: status.unpaid
    })
    return res.send("Created order")
}

exports.payment = async(req, res, next) => {
    order = req.locals;

    await Payment.create({
        staffId: 1,
        paymentMethod: res.locals.paymentMethod,
        amount: res.locals.amount,
        orderId: order.id
    }).then(abc => { return res.json(abc) })

}

exports.getAllOrder = async(req, res) => {
    const allOrder = await modelOrder.getAllOrder();
    return res.json(allOrder);
};

exports.updateOrder = async(req, res) => {
    const orderItem = req.locals;

    orderItem.update({ quantity: req.body.quantity, totalPrice: (orderItem.priceItem * req.body.quantity) })
    return res.json("Updated!");
};