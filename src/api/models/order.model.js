const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');
const Payment = require("./payment.model");
const events = require('events');
const User = require('./user.model');
const eventEmitter = new events.EventEmitter();

const Order = sequelize.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    total: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    status: Sequelize.STRING,
});

eventEmitter.on('clicked', async() => {
    Order.afterCreate(async(order, options) => {
        await order.addProduct(products.map(pro => {
            pro.orderItem = {
                quantity: pro.cartItem.quantity,
                totalPrice: pro.cartItem.totalPrice,
                priceItem: pro.cartItem.priceItem
            };
            pro.cartItem.destroy();
            return pro;
        }))
    })
})
eventEmitter.emit('clicked')

module.exports = class Orders {
    constructor() {

    }
    static Order = Order;
};