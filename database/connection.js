const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('project2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: 0,
    logging: false
});

sequelize.authenticate().then(console.log("kết nối ok"))
module.exports = sequelize;