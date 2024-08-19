const { DataTypes, Sequelize, Model } = require('sequelize');
const connection = require('../database/database');

const Servicos = connection.define('servicos', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
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
