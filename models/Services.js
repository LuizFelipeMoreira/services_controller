const { DataTypes } = require('sequelize');
const connection = require('../config/database');

const Servicos = connection.define('servicos', {
  nome: { type: DataTypes.STRING, allowNull: false },
  lente: { type: DataTypes.STRING, allowNull: false },
  laboratorio: { type: DataTypes.STRING, allowNull: false },
  os: { type: DataTypes.STRING, allowNull: false },
});

Servicos.sync({ force: false })
  .then(() => {
    console.log('Tabela criada com sucesso !');
  })
  .catch((err) => console.log(err));

module.exports = Servicos;
