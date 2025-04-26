import { DataTypes } from 'sequelize';
import connection from '../config/database';

export const Servicos = connection.define('servicos', {
    nome: { type: DataTypes.STRING, allowNull: false },
    lente: { type: DataTypes.STRING, allowNull: false },
    laboratorio: { type: DataTypes.STRING, allowNull: false },
    dataIda: { type: DataTypes.STRING, allowNull: false },
    dataEntrega: { type: DataTypes.STRING, allowNull: false },
    os: { type: DataTypes.STRING, allowNull: false },
    situacao: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pendente' },
});
