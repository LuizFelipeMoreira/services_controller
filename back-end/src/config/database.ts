import { Sequelize } from 'sequelize';

const connection = new Sequelize('servicos', 'root', 'inclo1254', {
    host: 'localhost',
    dialect: 'mysql',
});

export default connection;
