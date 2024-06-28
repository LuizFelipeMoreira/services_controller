"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.Services = database_1.connection.define('servicos', {
    nome: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    lente: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    laboratorio: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    os: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
// Servicos.sync({ force: false })
//   .then(() => {
//     console.log('Tabela criada com sucesso !');
//   })
//   .catch((err) => console.log(err));
