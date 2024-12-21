import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

export const User = connection.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch((err) => console.log(err));

console.log('All models were synchronized successfully.');
