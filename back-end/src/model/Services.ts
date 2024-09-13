import { DataTypes, Sequelize, Model } from 'sequelize';
import { connection } from '../config/database';

export const Servicos = connection.define('servicos', {
  nome: { type: DataTypes.STRING, allowNull: false },
  lente: { type: DataTypes.STRING, allowNull: false },
  laboratorio: { type: DataTypes.STRING, allowNull: false },
  os: { type: DataTypes.STRING, allowNull: false },
});
