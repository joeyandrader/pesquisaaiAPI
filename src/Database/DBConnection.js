const Sequelize = require('sequelize');

const connect = new Sequelize('pesquisaaidb', 'postgres', '1596325852', {
    host: 'localhost',
    dialect: 'postgres',
    timezone: '-3:00'
});

module.exports = connect