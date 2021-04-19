const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

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

module.exports = OrderItem;