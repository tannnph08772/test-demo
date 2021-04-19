const Product = require('../models/product.model')
const CartItem = require('../models/cartItem.model');
const Payment = require("../models/payment.model");
const status = require('../../../util/statusOrder')
const Order = require('../models/order.model').Order;
const modelOrder = require('../models/order.model');
const Cart = require('../models/cart.model');
const sequelize = require('../../../database/connection');

exports.getCart = async(req, res) => {
    const abc = await Cart.findOne({ where: { userId: req.user.id }, include: Product })
    res.json(abc)
};

exports.postCart = async(req, res, next) => {
    const newQty = 1;
    product = req.locals
        // console.log(res.locals.cartId)
    if (res.locals.cartItem == null) {
        await CartItem.create({
            cartId: res.locals.cartId,
            productId: product.id,
            priceItem: product.price,
            totalPrice: newQty * new Number(product.price),
            quantity: newQty
        })
    } else {
        await CartItem.update({
            quantity: res.locals.newQty,
            totalPrice: new Number(res.locals.newQty) * new Number(product.price),
            priceItem: product.price
        }, { where: { cartId: res.locals.cartId, productId: product.id } })
        product.update({ quantity: (product.quantity - 1) })
    }
    res.send(req.user.getCart({ include: ['products'] }))
};

exports.updateCart = async(req, res, next) => {
    product = req.locals

    if (product.cartItem.quantity > 1) {
        await CartItem.update({
            quantity: res.locals.newQty,
            totalPrice: new Number(res.locals.newQty) * new Number(product.price),
            priceItem: product.price
        }, { where: { cartId: res.locals.cartId, productId: product.id } })
        product.update({ quantity: (product.quantity + 1) })
        res.send(req.user.getCart({ include: ['products'] }))
    } else {
        product.update({ quantity: (product.quantity + 1) })
        return product.cartItem.destroy();
    }
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
        .catch(err => console.error(err));
};

exports.postOrder = async(req, res) => {
    products = await req.locals;
    cart = res.locals.cart;

    Order.create({ userId: req.user.id, total: req.locals['total'], quantity: req.locals['qty'], status: status.unpaid })
        .then(async(order) => {
            return await order.addProducts(products.map(pro => {
                pro.orderItem = {
                    quantity: pro.cartItem.quantity,
                    totalPrice: pro.cartItem.totalPrice,
                    priceItem: pro.cartItem.priceItem
                };
                return pro;
            }));
        })
        .then(cart.setProducts('null'))
        .catch(err => console.error(err));
    return res.json(req.user.getOrders({ include: ['products'] }))
}

exports.payment = async(req, res, next) => {
    const order = req.locals;
    const { paymentMethod, amount } = req.body;

    if (order.total <= amount) {
        await Order.update({ status: status.paid }, { where: { id: order.id } })
        console.log("thanh toán hết ")
    } else if (0 < amount < order.total) {
        await Order.update({ status: status.missing }, { where: { id: order.id } })
        console.log("chưa thanh toán hết ")
    } else {
        return res.send("Không thể thanh toán")
    }

    Payment.create({
        staffId: 1,
        paymentMethod,
        amount,
        orderId: order.id
    }).then(payment => { return res.json(payment) })
}

exports.getAllOrder = async(req, res) => {
    const allOrder = await modelOrder.getAllOrder();
    return res.json(allOrder);
};

exports.checkPayment = async(req, res) => {
    await Payment.findAll({
        attributes: ['orderId', [sequelize.fn('sum', sequelize.col('amount')), 'total']],
        group: ['Payment.orderId'],
        raw: true,
        order: sequelize.literal('total DESC')
    }).then(pay => {
        pay.map(pr => {
            Order.findOne({ where: { id: pr.id, userId: req.user.id } }).then(
                order => console.log(order.id, pr.total)
            )

            return res.json(pr)
        })
    })
}