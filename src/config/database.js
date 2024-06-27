const Sequelize = require('sequelize');

const connection = new Sequelize('servicos', 'root', 'inclo1254', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
