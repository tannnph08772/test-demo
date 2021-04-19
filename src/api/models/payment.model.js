const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Payment = sequelize.define("Payment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    staffId: Sequelize.INTEGER,
    paymentMethod: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Payment;

// module.exports = class Payments {
//     constructor() {

//     }
//     static getAllPayment() {
//         return new Promise((resolve, rejects) => {
//             Payment.findAll({ raw: true }).then(listPayment => resolve(listPayment))
//         })
//     }
//     static Payment = Payment;
// };