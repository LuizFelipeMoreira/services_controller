import { Sequelize } from 'sequelize';
import User from '../model/Users';

const connection = new Sequelize('servicos', 'root', 'inclo1254', {
    host: 'localhost',
    dialect: 'mysql',
});

export default connection;
