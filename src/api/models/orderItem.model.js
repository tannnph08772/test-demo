const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');
const Order = require('./order.model').Order;
const Product = require('./product.model');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    priceItem: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

OrderItem.afterUpdate(async(order, options) => {
    await Product.findOne({ where: { id: order.productId } }).then(
        product => {
            product.update({ quantity: product.quantity - (order.dataValues.quantity - order._previousDataValues.quantity) })
        }
    )
    await OrderItem.findAll({
        where: { orderId: order.OrderId },
        attributes: ['orderId', [sequelize.fn('sum', sequelize.col('totalPrice')), 'total'],
            [sequelize.fn('sum', sequelize.col('quantity')), "quantity"]
        ],
        group: ['orderId'],
        raw: true,
        order: sequelize.literal('total DESC')
    }).then(item => {
        item.map(async(iOrder) => {
            await Order.update({ quantity: iOrder.quantity, total: iOrder.total }, { where: { id: iOrder.orderId } })
        })
    })
})

module.exports = OrderItem;