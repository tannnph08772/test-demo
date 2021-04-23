const Sequelize = require('sequelize');
const sequelize = require('../../../database/connection');
const CartItem = require('./cartItem.model');
const Product = require('./product.model');

const Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
Cart.belongsToMany(Product, {
    through: CartItem
});
module.exports = Cart;
// module.exports = class Carts {
//     constructor() {

//     }
//     static getAllCart() {
//         return new Promise((resolve, rejects) => {
//             Cart.findAll({ raw: true }).then(listCart => resolve(listCart))
//         })
//     }
// };