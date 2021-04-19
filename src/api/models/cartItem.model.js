const Sequelize = require('sequelize');
const sequelize = require('../../../database/connection');


const CartItem = sequelize.define('cartItem', {
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
    },
    cartId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = CartItem;