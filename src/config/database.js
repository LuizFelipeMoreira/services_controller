const Sequelize = require('sequelize');

const connection = new Sequelize('servicos', 'root', '30112003', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
