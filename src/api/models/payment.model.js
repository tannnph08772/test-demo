const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');
const Order = require('./order.model').Order;
const status = require('../../../util/statusOrder');

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
Payment.afterCreate(async(payment, options) => {
        await Payment.findAll({
            where: { orderId: payment.orderId },
            attributes: ['orderId', [sequelize.fn('sum', sequelize.col('amount')), 'total']],
            group: ['Payment.orderId'],
            raw: true,
            order: sequelize.literal('total DESC')
        }).then(payment => {
            payment.map(async(pay) => {
                await Order.findOne({ where: { id: pay.orderId } }).then(
                    order => {
                        if (pay.total >= order.total) {
                            Order.update({ status: status.paid }, { where: { id: pay.orderId } })
                        }
                    }
                )
            })
        })
    })
    // module.exports = Payment;

module.exports = class Payments {
    constructor() {

    }
    static getAllPayment() {
        return new Promise((resolve, rejects) => {
            Payment.findAll({ raw: true }).then(listPayment => resolve(listPayment))
        })
    }
    static Payment = Payment;
};