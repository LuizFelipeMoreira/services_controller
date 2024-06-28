"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_1 = require("sequelize");
exports.connection = new sequelize_1.Sequelize('servicos', 'root', 'inclo1254', {
    host: 'localhost',
    dialect: 'mysql',
});
