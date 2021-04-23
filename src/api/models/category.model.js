const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');
const Product = require('../models/product.model');

const Category = sequelize.define("categories", {
    cateName: {
        type: Sequelize.STRING(40),
        allowNull: false
    }
});

// sequelize.sync().then(function() {
//     Category.create({
//         cateName: "Cate3"
//     })
//     Category.afterCreate((function(cate, options) {
//         console.log(1111);
//     }))
// })

// module.exports = Category;
module.exports = class Categories {
    constructor() {

    }
    static getAllCategory() {
        return new Promise((resolve, rejects) => {
            Category.findAll({ include: [{ model: Product, as: "products" }] }).then(listCategory => resolve(listCategory))
        })
    };
    static Category = Category;
    static postOrder() {

        Category.afterCreate(async(cate, options) => {
            await cate.update({ cateName: "qqqqqqqqqqqq" })
        })
    }

};