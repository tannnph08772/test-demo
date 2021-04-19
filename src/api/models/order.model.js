const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

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

// module.exports = Order;

module.exports = class Orders {
    constructor() {

    }
    static getAllOrder() {
        return new Promise((resolve, rejects) => {
            Order.findAll({ include: ['products'] }).then(listOrder => resolve(listOrder))
        })
    }
    static Order = Order;
};