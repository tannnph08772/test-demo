const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Product = sequelize.define("products", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productName: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    productDetail: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Product;
// module.exports = class Products {
//     constructor() {

//     }
//     static getAllProduct() {
//         return new Promise((resolve, rejects) => {
//             Product.findAll({ raw: true }).then(listProduct => resolve(listProduct))
//         })
//     }
//     static Product = Product;
// };